import React, {FC} from 'react';

import {SERVER_STATIC_PATH} from "../../../constants";
import {useCartInteractions} from "../../../hooks";

import {CartProductType, IconName} from "../../../types";

import {CountSelector, Icon} from "../../../components";

interface ICartProduct {
    product: CartProductType;
}

const CartProduct: FC<ICartProduct> = ({product}) => {
    const {count, updateCount, handleRemoveFromCart} = useCartInteractions(product);

    return (
        <div className="cart__product">
            <div className="cart__product-image"
                 style={{backgroundImage: `url(${SERVER_STATIC_PATH + product.image})`}}></div>
            <div className="cart__product-name">{product.name}</div>
            <CountSelector count={count} updateCount={updateCount}/>
            <div className="cart__product-price">{product.price} BYN</div>
            <div className="cart__product-remove" onClick={handleRemoveFromCart}>
                <Icon name={IconName.closeCross} needHover/>
            </div>
        </div>
    );
};

export default CartProduct;