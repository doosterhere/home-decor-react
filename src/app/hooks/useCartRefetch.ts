import {useEffect} from "react";

import {
    enqueueErrorMessage,
    resetNeedCartRefetch,
    resetUserHasBeenChanged,
    selectCart,
    selectCartToSync,
    selectIsLogged,
    selectNeedRefetch,
    selectUserHasBeenChanged,
    setCart,
    setNewCartHasBeenReceived
} from "../store";
import {useAppDispatch, useAppSelector, useCart, useCartSync} from "../hooks";
import {fetchCart} from "../utils";

export function useCartRefetch() {
    const dispatcher = useAppDispatch();
    const isLogged = useAppSelector(selectIsLogged);
    const needRefetch = useAppSelector(selectNeedRefetch);
    const cart = useAppSelector(selectCart);
    const cartToSync = useAppSelector(selectCartToSync);
    const hasUserBeenChanged = useAppSelector(selectUserHasBeenChanged);

    useCartSync();

    useEffect(() => {
        fetchCart(dispatcher)
            .then((data) => {
                if ('items' in data) {
                    dispatcher(setCart(data));

                    if (hasUserBeenChanged) {
                        dispatcher(setNewCartHasBeenReceived());
                        dispatcher(resetUserHasBeenChanged());
                    }

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
    }, [isLogged, needRefetch, cartToSync]);

    return useCart(cart);
}