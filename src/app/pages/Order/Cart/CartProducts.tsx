import React from 'react';

import {useAppSelector} from "../../../hooks";
import {selectCart} from "../../../store";

import CartProduct from "./CartProduct";

const CartProducts = () => {
    const cart = useAppSelector(selectCart);

    return (
        <div className="cart__products">
            {
                cart.items.map(
                    ({product, quantity}) =>
                        <CartProduct
                            key={product.id}
                            product={product}
                            quantity={quantity}
                        />
                )
            }
        </div>
    );
};

export default CartProducts;