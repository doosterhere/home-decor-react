import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";

import {enqueueErrorMessage, favoritesApi, productAPI, selectIsLogged} from "../../../store";
import {
    useAppDispatch,
    useAppSelector,
    useDebounceValue,
    useGetCountInCart,
    useUpdateCountOfProductInCart
} from "../../../hooks";

import {FavoritesType, IconName} from "../../../types";

import {CountSelector, Icon} from '../../../components';

const DetailInfoActions = () => {
    const params = useParams();
    const dispatcher = useAppDispatch();
    const updateCart = useUpdateCountOfProductInCart();
    const isLogged = useAppSelector(selectIsLogged);
    const {data: product} = productAPI.useGetProductQuery(params['url'] as string);
    const {
        data: favoritesData,
        isSuccess: isFavoritesRequestSuccess,
        fulfilledTimeStamp
    } = favoritesApi.useGetFavoritesQuery(undefined, {skip: !isLogged});
    const [addToFavorites] = favoritesApi.useAddToFavoritesMutation();
    const [removeFromFavorites] = favoritesApi.useRemoveFromFavoritesMutation();
    const [isInFavorites, setIsInFavorites] = useState(false);
    const [countInCart, isInCart] = useGetCountInCart(product?.id);
    const [count, setCount] = useState(countInCart || 1);
    const debouncedCount = useDebounceValue(count, 500);
    const [previousDebouncedCount, setPreviousDebouncedCount] = useState(debouncedCount);

    useEffect(() => {
        if (countInCart && debouncedCount !== previousDebouncedCount) {
            void updateCart(product?.id, debouncedCount);
        }

        setPreviousDebouncedCount(debouncedCount);
    }, [debouncedCount]);

    useEffect(() => {
        if (countInCart !== count) {
            setCount(countInCart || 1);
        }
    }, [countInCart]);

    useEffect(() => {
        if (isFavoritesRequestSuccess && favoritesData) {
            const result = (favoritesData as FavoritesType[]).some(item => item.id === product?.id);
            setIsInFavorites(result);
        }
    }, [favoritesData, fulfilledTimeStamp, isFavoritesRequestSuccess, product?.id]);

    const handleUpdateFavorites = () => {
        if (isInFavorites && product) {
            removeFromFavorites(product.id)
                .catch(() => {
                    dispatcher(enqueueErrorMessage('Не удалось удалить товар из избранного'));
                });
            return;
        }

        if (product) {
            addToFavorites(product.id)
                .catch(() => {
                    dispatcher(enqueueErrorMessage('Не удалось добавить товар в избранное'));
                });
        }
    };

    const handleAddToCart = async () => {
        await updateCart(product?.id, count);
    };

    const handleRemoveFromCart = async () => {
        await updateCart(product?.id, 0)
            .then(() => setCount(1));
    };

    if (product) {
        return (
            <>
                <div className='detail__info-params'>
                    <div className='detail__info-params-count'>
                        <span>Количество: </span>
                        <CountSelector count={count} updateCount={setCount}/>
                    </div>
                    <div className='detail__info-params-price'>{product.price} BYN</div>
                </div>
                <div className='detail__info-actions'>
                    {isLogged &&
                        <button className='button button_transparent button_with-icon'
                                onClick={handleUpdateFavorites}>

                            {!isInFavorites &&
                                <>
                                    <Icon name={IconName.heart} needParentHover/>
                                    <span>В избранное</span>
                                </>
                            }

                            {isInFavorites &&
                                <>
                                    <Icon name={IconName.heartFilled} needParentHover/>
                                    <span>В избранном</span>
                                </>
                            }

                        </button>
                    }

                    {!isInCart &&
                        <button className='button' onClick={handleAddToCart}>В корзину</button>
                    }

                    {isInCart &&
                        <button className='button button_transparent button_in-cart'
                                onClick={handleRemoveFromCart}>
                            <span>В корзине</span>
                            <span>Удалить</span>
                        </button>
                    }
                </div>
            </>
        );
    }

    return (
        <div></div>
    );
};

export default DetailInfoActions;