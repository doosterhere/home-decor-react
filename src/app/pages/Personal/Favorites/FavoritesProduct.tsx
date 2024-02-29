import React, {FC} from 'react';
import {useNavigate} from 'react-router-dom';

import {enqueueErrorMessage, favoritesApi} from "../../../store";
import {useAppDispatch, useCartInteractions, useDisabled, useGetCountInCart} from "../../../hooks";
import {ROUTES, SERVER_STATIC_PATH} from "../../../constants";

import {FavoritesType, IconName} from "../../../types";

import {CountSelector, Icon} from "../../../components";

interface IFavoritesProduct {
    product: FavoritesType
}

const FavoritesProduct: FC<IFavoritesProduct> = ({product}) => {
    const [countInCart] = useGetCountInCart(product?.id);
    const navigator = useNavigate();
    const dispatcher = useAppDispatch();
    const [removeFromFavorites] = favoritesApi.useRemoveFromFavoritesMutation();
    const {count, updateCount, handleAddToCart, handleRemoveFromCart} = useCartInteractions(product);
    const {state: disabled, disable, enable} = useDisabled();

    const handleRemoveFromFavorites = () => {
        disable();
        removeFromFavorites(product.id).unwrap()
            .catch(() => {
                dispatcher(enqueueErrorMessage('Не удалось удалить товар из избранного'));
            }).finally(() => {
                enable();
            }
        );
    }

    return (
        <div className="favorites__product">
            <div className="favorites__product-image"
                 style={{backgroundImage: `url(${SERVER_STATIC_PATH}/${product.image})`}}
                 onClick={() => navigator(`${ROUTES.PRODUCT}/${product.url}`)}
            ></div>
            <div className="favorites__product-name">{product.name}</div>
            <div className="favorites__product-price">{product.price} BYN</div>
            <div className="favorites__product-action">
                {!countInCart &&
                    <button className="button" onClick={handleAddToCart}>В корзину</button>
                }
                {!!countInCart &&
                    <>
                        <CountSelector count={count} updateCount={updateCount}/>
                        <button className="button button_transparent button_in-cart"
                                onClick={handleRemoveFromCart}>
                            <span>В корзине</span>
                            <span>Удалить</span>
                        </button>
                    </>
                }
            </div>
            <div className={disabled ? "favorites__product-remove disabled" : "favorites__product-remove"}
                 onClick={handleRemoveFromFavorites}
            >
                <Icon name={IconName.closeCross} needHover/>
            </div>
        </div>
    );
};

export default FavoritesProduct;