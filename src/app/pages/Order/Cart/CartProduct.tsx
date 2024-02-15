import React, {FC, useEffect, useState} from 'react';

import {SERVER_STATIC_PATH} from "../../../constants";
import {useDebounceValue, useUpdateCountOfProductInCart} from "../../../hooks";

import {CartProductType, IconName} from "../../../types";

import {CountSelector, Icon} from "../../../components";

interface ICartProduct {
    product: CartProductType;
    quantity: number;
}

const CartProduct: FC<ICartProduct> = ({product, quantity}) => {
    const [count, setCount] = useState(quantity);
    const debouncedCount = useDebounceValue(count, 500);
    const [previousDebouncedCount, setPreviousDebouncedCount] = useState(debouncedCount);
    const updateCart = useUpdateCountOfProductInCart();

    useEffect(() => {
        if (debouncedCount !== previousDebouncedCount) {
            void updateCart(product?.id, debouncedCount);
        }

        setPreviousDebouncedCount(debouncedCount);
    }, [debouncedCount]);

    const handleRemoveFromCart = async () => {
        await updateCart(product?.id, 0);
    };

    return (
        <div className="cart__product">
            <div className="cart__product-image"
                 style={{backgroundImage: `url(${SERVER_STATIC_PATH + product.image})`}}></div>
            <div className="cart__product-name">{product.name}</div>
            <CountSelector count={count} updateCount={setCount}/>
            <div className="cart__product-price">{product.price} BYN</div>
            <div className="cart__product-remove" onClick={handleRemoveFromCart}>
                <Icon name={IconName.closeCross} needHover/>
            </div>
        </div>
    );
};

export default CartProduct;