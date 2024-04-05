import React, {FC} from 'react';
import {useNavigate} from 'react-router-dom';
import {useCartInteractions, useDisabled, useFavoritesInteractions, useGetCountInCart} from "../../../hooks";
import {ROUTES, SERVER_STATIC_PATH} from "../../../constants";

import {FavoritesType, IconName} from "../../../types";

import {Button, CountSelector, Icon} from "../../../components";

interface IFavoritesProduct {
    product: FavoritesType
}

const FavoritesProduct: FC<IFavoritesProduct> = ({product}) => {
    const [countInCart] = useGetCountInCart(product?.id);
    const navigator = useNavigate();
    const {
        isUpdating: isFavoritesUpdating,
        removeFromFavorites: handleRemoveFromFavorites
    } = useFavoritesInteractions(product);
    const {
        count,
        isUpdating: isCartUpdating,
        updateCount,
        handleAddToCart,
        handleRemoveFromCart
    } = useCartInteractions(product);
    const {state: disabledFavorites} = useDisabled(isFavoritesUpdating);

    return (
        <div className="favorites__product">
            <div className="favorites__product-image"
                 style={{backgroundImage: `url(${SERVER_STATIC_PATH}/${product.image})`}}
                 onClick={() => navigator(`${ROUTES.PRODUCT}/${product.url}`)}
            ></div>
            <div className="favorites__product-name">{product.name}</div>
            <div className="favorites__product-price">{product.price} BYN</div>
            <div className="favorites__product-action">
                <CountSelector count={count} updateCount={updateCount}/>
                {!countInCart &&
                    <Button
                        onClick={handleAddToCart}
                        disabled={isCartUpdating}
                        isLoading={isCartUpdating}
                    >
                        В корзину
                    </Button>
                }
                {!!countInCart &&
                    <Button
                        className="button_transparent button_in-cart"
                        onClick={handleRemoveFromCart}
                        disabled={isCartUpdating}
                        isLoading={isCartUpdating}
                    >
                        <span>В корзине</span>
                        <span>Удалить</span>
                    </Button>
                }
            </div>
            <div className={disabledFavorites ? "favorites__product-remove disabled" : "favorites__product-remove"}
                 onClick={handleRemoveFromFavorites}
            >
                <Icon name={IconName.closeCross} needHover/>
            </div>
        </div>
    );
};

export default FavoritesProduct;