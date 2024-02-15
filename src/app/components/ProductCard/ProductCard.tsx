import React, {FC, useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";

import './ProductCard.scss';

import {cartAPI, enqueueErrorMessage, favoritesApi, selectIsLogged, setCart, setNeedCartRefetch} from "../../store";
import {ROUTES, SERVER_STATIC_PATH} from "../../constants";
import {useAppDispatch, useAppSelector, useDebounceValue} from "../../hooks";

import {IconName, ProductType} from "../../types";

import {CountSelector, Icon} from "../../components";

interface IProductCardProps {
    product: ProductType | null;
    isLight?: boolean;
    countInCart: number;
}

export const ProductCard: FC<IProductCardProps> =
    ({
         product,
         isLight,
         countInCart
     }) => {
        const isLogged = useAppSelector(selectIsLogged);
        const [count, setCount] = useState(countInCart || 1);
        const debouncedCount = useDebounceValue(count, 500);
        const [previousDebouncedCount, setPreviousDebouncedCount] = useState(debouncedCount);
        const navigator = useNavigate();
        const dispatcher = useAppDispatch();
        const [addToFavorites] = favoritesApi.useAddToFavoritesMutation();
        const [removeFromFavorites] = favoritesApi.useRemoveFromFavoritesMutation();
        const [updateCart] = cartAPI.useUpdateCartMutation();

        useEffect(() => {
            if (countInCart && debouncedCount !== previousDebouncedCount && product) {
                updateCountOfProductInCart(debouncedCount)
                    .catch(err => console.log('err when updated quantity: ' + err));
            }

            setPreviousDebouncedCount(debouncedCount);
        }, [debouncedCount]);

        const navigate = () => {
            if (isLight && product) {
                navigator(`${ROUTES.PRODUCT}/${product.url}`);
            }
        };

        const updateFavorites = () => {
            if (product && product.inFavorites) {
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

        const updateCountOfProductInCart = async (quantity: number) => {
            if (product) {
                await updateCart({
                    productId: product.id,
                    quantity: quantity
                })
                    .then(res => {
                        if (res && 'data' in res && 'items' in res.data) {
                            dispatcher(setCart(res.data));
                            if (!quantity) {
                                setCount(1);
                            }
                            return;
                        }

                        dispatcher(setNeedCartRefetch());
                        dispatcher(enqueueErrorMessage('Произошла ошибка, обновите страницу и повторите попытку'));
                    })
                    .catch(() => {
                        dispatcher(enqueueErrorMessage('Произошла ошибка, попробуйте позже'));
                    });
            }
        };

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
                        <>
                            <div className='product-card__info'>
                                <div className='product-card__price'>{product.price} BYN</div>
                                <div className='product-card__action'>
                                    {countInCart === 0 &&
                                        <button className='button' onClick={() => updateCountOfProductInCart(count)}>В
                                            корзину</button>
                                    }
                                    {countInCart > 0 &&
                                        <button className='button button_transparent button_in-cart'
                                                onClick={() => updateCountOfProductInCart(0)}>
                                            <span>В корзине</span>
                                            <span>Удалить</span>
                                        </button>
                                    }
                                </div>
                            </div>
                            <div className='product-card__extra'>
                                <CountSelector count={count} updateCount={setCount}/>
                                <Link to={`${ROUTES.PRODUCT}/${product.url}`} className='product-card__detail'>
                                    <Icon name={IconName.dots} needParentHover/>
                                    <span>Подробнее</span>
                                </Link>
                            </div>
                        </>
                    }
                </div>
            );
        }

        return (
            <div></div>
        );
    };