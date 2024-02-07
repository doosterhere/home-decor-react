import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";

import {favoritesApi, productAPI, selectIsLogged} from "../../../store";
import {useAppSelector} from "../../../hooks";

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

    useEffect(() => {
        if (isFavoritesRequestSuccess && favoritesData) {
            const result = (favoritesData as FavoritesType[]).some(item => item.id === product?.id);
            setIsInFavorites(result);
        }
    }, [favoritesData, fulfilledTimeStamp, isFavoritesRequestSuccess, product?.id]);

    const handleUpdateFavorite = () => {
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
                            onClick={handleUpdateFavorite}>

                        {!isInFavorites &&
                            <>
                                <Icon name={IconName.heart}/>
                                <span>В избранное</span>
                            </>
                        }

                        {isInFavorites &&
                            <>
                                <Icon name={IconName.heartFilled}/>
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