import {useEffect} from "react";

import {cartAPI, enqueueErrorMessage, resetNeedCartRefetch, selectIsLogged, selectNeedRefetch, setCart} from "../store";
import {useAppDispatch, useAppSelector} from "./redux";

export function useCartRefetch() {
    const dispatcher = useAppDispatch();
    const isLogged = useAppSelector(selectIsLogged);
    const needRefetch = useAppSelector(selectNeedRefetch);

    useEffect(() => {
        getCart().catch(error => console.log('error in fetch after login/logout: ', error));

        if (needRefetch) {
            dispatcher(resetNeedCartRefetch());
        }
    }, [isLogged, needRefetch]);

    async function getCart() {
        const cartPromise = dispatcher(cartAPI.endpoints?.getCart.initiate());
        const refetchCartPromise = cartPromise.refetch.bind(cartPromise);

        await refetchCartPromise()
            .then(res => {
                if (res && res.data && 'items' in res.data) {
                    dispatcher(setCart(res.data));

                    return;
                }

                throw new Error();
            })
            .catch(() => {
                    dispatcher(enqueueErrorMessage('Не удалось загрузить корзину товаров, попробуйте позже'));
                }
            )
            .finally(() => {
                cartPromise.unsubscribe();
            });
    }
}