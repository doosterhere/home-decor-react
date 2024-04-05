import React, {FC} from 'react';
import {Link, useNavigate} from "react-router-dom";

import './ProductCard.scss';

import {selectIsLogged} from "../../store";
import {ROUTES, SERVER_STATIC_PATH} from "../../constants";
import {
    useAppSelector,
    useCartInteractions,
    useDisabled,
    useFavoritesInteractions,
    useGetCountInCart
} from "../../hooks";

import {IconName, ProductType} from "../../types";

import {Button, CountSelector, Icon} from "../../components";

interface IProductCard {
    product: ProductType | null;
    isLight?: boolean;
}

export const ProductCard: FC<IProductCard> =
    ({
         product,
         isLight
     }) => {
        const [countInCart] = useGetCountInCart(product?.id);
        const isLogged = useAppSelector(selectIsLogged);
        const navigator = useNavigate();
        const {updateFavorites} = useFavoritesInteractions(product, product?.inFavorites);
        const {
            count,
            isUpdating: isCartUpdating,
            updateCount,
            handleAddToCart,
            handleRemoveFromCart
        } = useCartInteractions(product);
        const {state: disabledCart} = useDisabled(isCartUpdating);

        const navigate = () => {
            if (isLight && product) {
                navigator(`${ROUTES.PRODUCT}/${product.url}`);
            }
        };

        if (product) {
            return (
                <div onClick={navigate}
                     className={isLight ? 'product-card is-light' : 'product-card'}
                >

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
                                        <Button
                                            onClick={handleAddToCart}
                                            disabled={disabledCart}
                                            isLoading={isCartUpdating}
                                        >
                                            В корзину
                                        </Button>
                                    }
                                    {Number(countInCart) > 0 &&
                                        <Button
                                            className='button_transparent button_in-cart'
                                            onClick={handleRemoveFromCart}
                                            disabled={disabledCart}
                                            isLoading={isCartUpdating}
                                        >
                                            <span>В корзине</span>
                                            <span>Удалить</span>
                                        </Button>
                                    }
                                </div>
                            </div>
                            <div className='product-card__extra'>
                                <CountSelector count={count} updateCount={updateCount}/>
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