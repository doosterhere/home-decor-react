import React from 'react';
import {useParams} from "react-router-dom";

import {productAPI, selectIsLogged} from "../../../store";
import {useAppSelector} from "../../../hooks";

import {IconName} from "../../../types";

import Icon from "../../../components/Icon/Icon";

const DetailInfoActions = () => {
    const params = useParams();
    const isLogged = useAppSelector(selectIsLogged);
    const {data: product} = productAPI.useGetProductQuery(params['url'] as string);

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

                        {!product.inFavorites &&
                            <Icon name={IconName.heart}/>
                        }

                        {!!product.inFavorites &&
                            <Icon name={IconName.heartFilled}/>
                        }

                        {!product.inFavorites &&
                            <span>В избранное</span>
                        }

                        {!!product.inFavorites &&
                            <span>В избранном</span>
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