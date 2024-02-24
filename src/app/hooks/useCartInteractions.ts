import {useEffect, useState} from "react";

import {resetNewCartHasBeenReceived, selectNewCartHasBeenReceived} from "../store";
import {
    useAppDispatch,
    useAppSelector,
    useDebounceFunction,
    useGetCountInCart,
    useUpdateCountOfProductInCart
} from "../hooks";

import {CartProductType, ProductType} from "../types";

export function useCartInteractions(product: ProductType | CartProductType | null) {
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

    function updateCountInCart(count: number) {
        if (countInCart) {
            void updateCart(product?.id, count);
        }
    }

    const handleAddToCart = async () => {
        await updateCart(product?.id, count);
    };

    const handleRemoveFromCart = async () => {
        await updateCart(product?.id, 0);
        setCount(1);
    };

    const updateCount = (count: number) => {
        setCount(count);
        debouncedUpdateCart(count)
    }

    return {
        count,
        setCount,
        handleAddToCart,
        handleRemoveFromCart,
        updateCount
    }
}