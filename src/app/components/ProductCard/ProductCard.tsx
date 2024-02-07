import React, {FC, SetStateAction, useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";

import './ProductCard.scss';

import {enqueueErrorMessage, favoritesApi, selectIsLogged} from "../../store";
import {ROUTES, SERVER_STATIC_PATH} from "../../constants";
import {useAppDispatch, useAppSelector} from "../../hooks";

import {ICartItem, IconName, ProductType} from "../../types";

import {CountSelector, Icon} from "../../components";

interface IProductCardProps {
    product: ProductType | null;
    isLight?: boolean;
    countInCart?: number;
    updateCart?: (cartItem: ICartItem) => void;
}

export const ProductCard: FC<IProductCardProps> =
    ({
         product,
         isLight,
         countInCart = 0,
         updateCart
     }) => {
        const isLogged = useAppSelector(selectIsLogged);
        const [count, setCount] = useState(1);
        const navigator = useNavigate();
        const dispatcher = useAppDispatch();
        const [addToFavorites] = favoritesApi.useAddToFavoritesMutation();
        const [removeFromFavorites] = favoritesApi.useRemoveFromFavoritesMutation();

        const navigate = () => {
            if (isLight && product) {
                navigator(`${ROUTES.PRODUCT}/${product.url}`);
            }
        };

        const updateCount = (value: SetStateAction<number>) => {
            setCount(value);
            if (countInCart) {
                addToCart();
            }
        };

        const updateFavorites = () => {
            if (product && product.inFavorites) {
                removeFromFavorites(product.id)
                    .unwrap()
                    .catch(() => {
                        dispatcher(enqueueErrorMessage('Не удалось удалить товар из избранного'));
                    });
                return;
            }

            if (product) {
                addToFavorites(product.id)
                    .unwrap()
                    .catch(() => {
                        dispatcher(enqueueErrorMessage('Не удалось добавить товар в избранное'));
                    });
            }
        };

        const addToCart = () => {
            if (product && updateCart) {
                updateCart({
                    productId: product.id,
                    quantity: count
                });
                countInCart = count;
            }
        };

        const removeFromCart = () => {
            if (product && updateCart) {
                updateCart({
                    productId: product.id,
                    quantity: 0
                });
                countInCart = 0;
                setCount(1);
            }
        };


        useEffect(() => {
            if (countInCart) {
                setCount(countInCart);
            }
        }, [countInCart]);

        if (product) {
            return (
                <div onClick={navigate}
                     className={isLight ? 'product-card is-light' : 'product-card'}>
                    {(isLogged && !isLight) &&
                        <div className='product-card__favorite' onClick={updateFavorites}>
                            {!product.inFavorites &&
                                <Icon name={IconName.heartBig}/>
                            }
                            {product.inFavorites &&
                                <Icon name={IconName.heartBigFilled}/>
                            }
                        </div>
                    }
                    <div className='product-card__image'
                         style={{backgroundImage: `url(${SERVER_STATIC_PATH + product.image})`}}></div>
                    <div className='product-card__name'>{product.name}</div>
                    {!isLight &&
                        <div className='product-card__info'>
                            <div className='product-card__price'>{product.price} BYN</div>
                            <div className='product-card__action'>
                                {countInCart === 0 &&
                                    <button className='button' onClick={addToCart}>В корзину</button>
                                }
                                {countInCart > 0 &&
                                    <button className='button button_transparent button_in-cart'
                                            onClick={removeFromCart}>
                                        <span>В корзине</span>
                                        <span>Удалить</span>
                                    </button>
                                }
                            </div>
                        </div>
                    }
                    {!isLight &&
                        <div className='product-card__extra'>
                            <CountSelector count={count} updateCount={updateCount}/>
                            <Link to={`${ROUTES.PRODUCT}/${product.url}`} className='product-card__detail'>
                                <Icon name={IconName.dots} needParentHover/>
                                <span>Подробнее</span>
                            </Link>
                        </div>
                    }
                </div>
            );
        }

        return (
            <div></div>
        );
    };