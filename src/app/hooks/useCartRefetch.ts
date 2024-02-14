import {useEffect} from "react";

import {resetNeedCartRefetch, selectCart, selectIsLogged, selectNeedRefetch} from "../store";
import {useAppDispatch, useAppSelector, useCart} from "../hooks";
import {fetchCart} from "../utils";

export function useCartRefetch() {
    const dispatcher = useAppDispatch();
    const isLogged = useAppSelector(selectIsLogged);
    const needRefetch = useAppSelector(selectNeedRefetch);
    const cart = useAppSelector(selectCart);

    useEffect(() => {
        fetchCart(dispatcher).catch(error => console.log('error in fetch after login/logout: ', error));

        if (needRefetch) {
            dispatcher(resetNeedCartRefetch());
        }
    }, [isLogged, needRefetch]);

    return useCart(cart);
}