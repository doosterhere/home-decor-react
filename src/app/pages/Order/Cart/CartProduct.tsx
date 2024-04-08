import React, {FC} from 'react';
import {Link} from "react-router-dom";

import CircularProgress from "@mui/material/CircularProgress";

import {ROUTES, SERVER_STATIC_PATH} from "../../../constants";
import {useCartInteractions, useDisabled} from "../../../hooks";

import {CartProductType, IconName} from "../../../types";

import {CountSelector, Icon} from "../../../components";

interface ICartProduct {
    product: CartProductType;
    quantity: number;
}

const CartProduct: FC<ICartProduct> = ({product, quantity}) => {
    const {count, isUpdating, updateCount, handleRemoveFromCart} = useCartInteractions(product, quantity);
    const {state: disabled} = useDisabled(isUpdating);

    return (
        <div className="cart__product">
            <Link className="cart__product-image"
                  style={{backgroundImage: `url(${SERVER_STATIC_PATH + product.image})`}}
                  to={`${ROUTES.PRODUCT}/${product.url}`}
            />
            <div className="cart__product-name">{product.name}</div>
            <CountSelector count={count} updateCount={updateCount}/>
            <div className="cart__product-price">{product.price} BYN</div>
            <div className={disabled ? "cart__product-remove disabled" : "cart__product-remove"}
                 onClick={handleRemoveFromCart}
            >
                {!disabled &&
                    <Icon name={IconName.closeCross} needHover/>
                }
                {disabled &&
                    <CircularProgress size={16}/>
                }
            </div>
        </div>
    );
};

export default CartProduct;