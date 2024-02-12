import React, {FC} from 'react';
import {useNavigate} from 'react-router-dom';

import {enqueueErrorMessage, enqueueSuccessMessage, favoritesApi} from "../../../store";
import {useAppDispatch} from "../../../hooks";
import {ROUTES, SERVER_STATIC_PATH} from "../../../constants";

import {FavoritesType, IconName} from "../../../types";

import {CountSelector, Icon} from "../../../components";

interface IFavoritesProduct {
    product: FavoritesType
}

const FavoritesProduct: FC<IFavoritesProduct> = ({product}) => {
    const navigator = useNavigate();
    const dispatcher = useAppDispatch();
    const [removeFromFavorites] = favoritesApi.useRemoveFromFavoritesMutation();

    //dummy section
    const count = 1;
    const countInCart = 0;

    const addToCart = () => {
    };

    const updateCount = () => {
    };

    const removeFromCart = () => {
    };
    //end dummy section

    const handleRemoveFromFavorites = () => {
        removeFromFavorites(product.id).unwrap()
            .then(res => {
                if (!res.error) {
                    dispatcher(enqueueSuccessMessage('Удалёно из избранного'));
                }
            })
            .catch(() => {
                dispatcher(enqueueErrorMessage('Ошибка при удалении'));
            });

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
                    <button className="button" onClick={addToCart}>В корзину</button>
                }
                {!!countInCart &&
                    <CountSelector count={count} updateCount={updateCount}/>
                }
                {!!countInCart &&
                    <button className="button button_transparent button_in-cart"
                            onClick={removeFromCart}>
                        <span>В корзине</span>
                        <span>Удалить</span>
                    </button>
                }
            </div>
            <div className="favorites__product-remove" onClick={handleRemoveFromFavorites}>
                <Icon name={IconName.closeCross} needHover/>
            </div>
        </div>
    );
};

export default FavoritesProduct;