import React, {FC} from 'react';
import {useNavigate} from 'react-router-dom';

import {enqueueErrorMessage, enqueueSuccessMessage, favoritesApi} from "../../../store";
import {useAppDispatch, useCartInteractions, useGetCountInCart} from "../../../hooks";
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

    const handleRemoveFromFavorites = () => {
        removeFromFavorites(product.id).unwrap()
            .then(res => {
                if (!res.error) {
                    dispatcher(enqueueSuccessMessage('Удалёно из избранного'));
                }
            })
            .catch(() => {
                dispatcher(enqueueErrorMessage('Ошибка при удалении'));
            })
            .finally();

    };

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
            <div className="favorites__product-remove" onClick={handleRemoveFromFavorites}>
                <Icon name={IconName.closeCross} needHover/>
            </div>
        </div>
    );
};

export default FavoritesProduct;