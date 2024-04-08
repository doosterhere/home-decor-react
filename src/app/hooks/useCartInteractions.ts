import {useCallback, useEffect, useState} from "react";

import {
    cartAPI,
    enqueueErrorMessage,
    resetNewCartHasBeenReceived,
    selectNewCartHasBeenReceived,
    setCart,
    setNeedCartRefetch
} from "../store";
import {useAppDispatch, useAppSelector, useDebounceFunction, useGetCountInCart} from "../hooks";

import {CartProductType, ProductType} from "../types";

export function useCartInteractions(product: ProductType | CartProductType | null | undefined, quantity?: number) {
    const [countInCart] = useGetCountInCart(product?.id);
    const [count, setCount] = useState<number>(countInCart || 1);
    const [updateCart, {isLoading: isUpdating}] = cartAPI.useUpdateCartMutation();
    const debouncedUpdateCart = useDebounceFunction(updateCountInCart, 500);
    const hasNewCartBeenReceivedAfterUserChange = useAppSelector(selectNewCartHasBeenReceived);
    const dispatcher = useAppDispatch();

    useEffect(() => {
        if (countInCart !== count && hasNewCartBeenReceivedAfterUserChange) {
            setCount(countInCart || 1);
            dispatcher(resetNewCartHasBeenReceived());
        }
    }, [countInCart, hasNewCartBeenReceivedAfterUserChange, dispatcher]);

    useEffect(() => {
        if (quantity) {
            setCount(quantity);
        }
    }, [quantity]);

    const update = useCallback(async (id: string | undefined, quantity: number) => {
        if (id) {
            try {
                const result = await updateCart({
                    productId: id,
                    quantity: quantity
                }).unwrap();

                if ('items' in result) {
                    dispatcher(setCart(result));
                } else {
                    dispatcher(setNeedCartRefetch());
                    dispatcher(enqueueErrorMessage('Произошла ошибка, повторите попытку'));
                }
            } catch (error) {
                dispatcher(enqueueErrorMessage('Произошла ошибка, попробуйте позже'));
            }
        }
    }, [updateCart, dispatcher]);

    function updateCountInCart(newCount: number) {
        if (countInCart && product?.id) {
            void update(product.id, newCount);
        }
    }

    const handleAddToCart = useCallback(() => {
        if (product?.id) {
            void update(product.id, count);
        }
    }, [product?.id, count, update]);

    const handleRemoveFromCart = useCallback(() => {
        if (product?.id) {
            void update(product.id, 0);
            setCount(1);
        }
    }, [product?.id, update]);

    const updateCount = useCallback((newCount: number) => {
        if (product?.id) {
            setCount(newCount);
            debouncedUpdateCart(newCount);
        }
    }, [updateCountInCart]);

    return {
        count,
        isUpdating,
        handleAddToCart,
        handleRemoveFromCart,
        updateCount
    }
}