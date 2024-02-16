import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";

import {enqueueErrorMessage, favoritesApi, productAPI, selectIsLogged} from "../../../store";
import {useAppDispatch, useAppSelector} from "../../../hooks";

import {FavoritesType, IconName} from "../../../types";

import {Icon} from '../../../components';

const DetailInfoActions = () => {
    const params = useParams();
    const isLogged = useAppSelector(selectIsLogged);
    const {data: product} = productAPI.useGetProductQuery(params['url'] as string);
    const [isInFavorites, setIsInFavorites] = useState(false);
    const {
        data: favoritesData,
        isSuccess: isFavoritesRequestSuccess,
        fulfilledTimeStamp
    } = favoritesApi.useGetFavoritesQuery(undefined, {skip: !isLogged});
    const [addToFavorites] = favoritesApi.useAddToFavoritesMutation();
    const [removeFromFavorites] = favoritesApi.useRemoveFromFavoritesMutation();
    const dispatcher = useAppDispatch();

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

    const handleAddToCart = () => {
    };

    const handleRemoveFromCart = () => {
    };

    if (product) {
        return (
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

                {!product.countInCart &&
                    <button className='button' onClick={handleAddToCart}>В корзину</button>
                }

                {!!product.countInCart &&
                    <button className='button button_transparent button_in-cart'
                            onClick={handleRemoveFromCart}>
                        <span>В корзине</span>
                        <span>Удалить</span>
                    </button>
                }
            </div>
        );
    }

    return (
        <div></div>
    );
};

export default DetailInfoActions;