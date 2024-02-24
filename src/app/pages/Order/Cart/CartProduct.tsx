import React, {FC, useEffect, useState} from 'react';

import {SERVER_STATIC_PATH} from "../../../constants";
import {resetNewCartHasBeenReceived, selectNewCartHasBeenReceived} from "../../../store";
import {
    useAppDispatch,
    useAppSelector,
    useDebounceFunction,
    useGetCountInCart,
    useUpdateCountOfProductInCart
} from "../../../hooks";

import {CartProductType, IconName} from "../../../types";

import {CountSelector, Icon} from "../../../components";

interface ICartProduct {
    product: CartProductType;
}

const CartProduct: FC<ICartProduct> = ({product}) => {
    const [countInCart] = useGetCountInCart(product?.id);
    const [count, setCount] = useState(countInCart || 1);
    const updateCart = useUpdateCountOfProductInCart();
    const debouncedUpdateCart = useDebounceFunction(updateCountInCart, 500);
    const hasNewCartBeenReceivedAfterUserChange = useAppSelector(selectNewCartHasBeenReceived);
    const dispatcher = useAppDispatch();

    useEffect(() => {
        if (countInCart !== count && hasNewCartBeenReceivedAfterUserChange) {
            setCount(countInCart || 1);
            dispatcher(resetNewCartHasBeenReceived());
        }
    }, [countInCart, hasNewCartBeenReceivedAfterUserChange]);

    const handleRemoveFromCart = async () => {
        await updateCart(product?.id, 0);
    };

    function updateCountInCart(count: number) {
        if (countInCart) {
            void updateCart(product?.id, count);
        }
    }

    const updateCount = (count: number) => {
        setCount(count);
        debouncedUpdateCart(count)
    }

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