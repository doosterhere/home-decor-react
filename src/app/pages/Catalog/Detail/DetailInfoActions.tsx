import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";

import {favoritesApi, productAPI, selectIsLogged} from "../../../store";
import {useAppSelector, useCartInteractions, useGetCountInCart, useFavoritesInteractions} from "../../../hooks";

import {FavoritesType, IconName} from "../../../types";

import {CountSelector, Icon} from '../../../components';

const DetailInfoActions = () => {
    const params = useParams();
    const isLogged = useAppSelector(selectIsLogged);
    const {data: product} = productAPI.useGetProductQuery(params['url'] as string);
    const {
        data: favoritesData,
        isSuccess: isFavoritesRequestSuccess,
        fulfilledTimeStamp
    } = favoritesApi.useGetFavoritesQuery(undefined, {skip: !isLogged});
    const [isInFavorites, setIsInFavorites] = useState(false);
    const {updateFavorites: handleUpdateFavorites} = useFavoritesInteractions(product, isInFavorites);
    const [, isInCart] = useGetCountInCart(product?.id);
    const {count, updateCount, handleAddToCart, handleRemoveFromCart} = useCartInteractions(product);

    useEffect(() => {
        if (isFavoritesRequestSuccess && favoritesData) {
            const result = (favoritesData as FavoritesType[]).some(item => item.id === product?.id);
            setIsInFavorites(result);
        }
    }, [favoritesData, fulfilledTimeStamp, isFavoritesRequestSuccess, product?.id]);

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