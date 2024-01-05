import React, {FC} from 'react';
import {useParams} from "react-router-dom";

import {productAPI} from "../../../store";

import {IconName} from "../../../types/icon-name.type";
import {IDetailInfo} from "./Detail";

import Icon from "../../../components/Icon/Icon";

const DetailInfoActions: FC<IDetailInfo> = ({isLogged}) => {
    const params = useParams();
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