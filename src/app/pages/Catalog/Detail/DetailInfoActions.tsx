import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";

import {
    favoritesApi,
    productAPI,
    resetNewCartHasBeenReceived,
    selectIsLogged,
    selectNewCartHasBeenReceived
} from "../../../store";
import {
    useAppDispatch,
    useAppSelector,
    useDebounceFunction,
    useGetCountInCart,
    useUpdateCountOfProductInCart,
    useUpdateFavorites
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
    const [isInFavorites, setIsInFavorites] = useState(false);
    const handleUpdateFavorites = useUpdateFavorites(product, isInFavorites);
    const [countInCart, isInCart] = useGetCountInCart(product?.id);
    const [count, setCount] = useState(countInCart || 1);
    const debouncedUpdateCart = useDebounceFunction(updateCountInCart, 500);
    const hasNewCartBeenReceivedAfterUserChange = useAppSelector(selectNewCartHasBeenReceived);

    useEffect(() => {
        if (countInCart !== count && hasNewCartBeenReceivedAfterUserChange) {
            setCount(countInCart || 1);
            dispatcher(resetNewCartHasBeenReceived());
        }
    }, [countInCart, hasNewCartBeenReceivedAfterUserChange]);

    useEffect(() => {
        if (isFavoritesRequestSuccess && favoritesData) {
            const result = (favoritesData as FavoritesType[]).some(item => item.id === product?.id);
            setIsInFavorites(result);
        }
    }, [favoritesData, fulfilledTimeStamp, isFavoritesRequestSuccess, product?.id]);

    const handleAddToCart = async () => {
        await updateCart(product?.id, count);
    };

    const handleRemoveFromCart = async () => {
        await updateCart(product?.id, 0)
            .then(() => setCount(1));
    };

    function updateCountInCart(count: number) {
        if (countInCart) {
            void updateCart(product?.id, count);
        }
    }

    const updateCount = (count: number) => {
        setCount(count);
        debouncedUpdateCart(count)
    }

    if (product) {
        return (
            <>
                <div className='detail__info-params'>
                    <div className='detail__info-params-count'>
                        <span>Количество: </span>
                        <CountSelector count={count} updateCount={updateCount}/>
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