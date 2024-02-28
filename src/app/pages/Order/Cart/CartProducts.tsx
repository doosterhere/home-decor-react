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
                    ({product}) =>
                        <CartProduct
                            key={product.id}
                            product={product}
                        />
                )
            }
        </div>
    );
};

export default CartProducts;