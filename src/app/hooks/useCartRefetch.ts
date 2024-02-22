import {useEffect} from "react";

import {
    enqueueErrorMessage,
    resetNeedCartRefetch,
    selectCart,
    selectIsLogged,
    selectNeedRefetch,
    setCart
} from "../store";
import {useAppDispatch, useAppSelector, useCart} from "../hooks";
import {fetchCart} from "../utils";

export function useCartRefetch() {
    const dispatcher = useAppDispatch();
    const isLogged = useAppSelector(selectIsLogged);
    const needRefetch = useAppSelector(selectNeedRefetch);
    const cart = useAppSelector(selectCart);

    useEffect(() => {
        fetchCart(dispatcher)
            .then((data) => {
                if ('items' in data) {
                    dispatcher(setCart(data));

                    return;
                }

                if ('error' in data) {
                    throw new Error();
                }
            })
            .catch(() => {
                dispatcher(enqueueErrorMessage('Не удалось загрузить корзину товаров, попробуйте позже'));
            });

        if (needRefetch) {
            dispatcher(resetNeedCartRefetch());
        }
    }, [isLogged, needRefetch]);

    return useCart(cart);
}