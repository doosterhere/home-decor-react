import {useEffect, useRef, useState} from 'react';

import {
    cartAPI,
    enqueueErrorMessage,
    enqueueSuccessMessage,
    resetCartToSync,
    selectCartToSync,
    selectIsLogged
} from "../store";
import {useAppDispatch, useAppSelector} from "./redux";
import {fetchCart, getCartPositionsToSync} from "../utils";

import {CartType, DefaultResponseType, ICartItem} from "../types";

export function useCartSync() {
    const dispatcher = useAppDispatch();
    const isLogged = useAppSelector(selectIsLogged);
    const cartToSync = useAppSelector(selectCartToSync);
    const cart = useRef<CartType>({items: []});
    const syncList = useRef<ICartItem[]>([]);
    const isInSync = useRef(false);
    const [updateCart] = cartAPI.useUpdateCartMutation();
    const [repeatCounter, setRepeatCounter] = useState(0);

    useEffect(() => {
        if (!isLogged || isInSync.current) {
            return;
        }

        if (!cartToSync.items.length) {
            return;
        }

        void synchronize();
    }, [repeatCounter]);

    async function loadCart() {
        try {
            const fetchData = await fetchCart(dispatcher);
            checkError(fetchData);

            if ('items' in fetchData) {
                cart.current = fetchData
                syncList.current = getCartPositionsToSync(cart.current, cartToSync);
            }
        } catch (e) {
            if (e instanceof Error && 'error' in e && 'message' in e) {
                dispatcher(enqueueErrorMessage(`Ошибка при синхронизации корзины: ${e.message}`));
                return;
            }

            dispatcher(enqueueErrorMessage('Ошибка при синхронизации корзины'));
            console.log('error getting the cart during syncing: ', e);
        }
    }

    async function synchronize() {
        isInSync.current = true;

        await loadCart();

        if (!syncList.current.length) {
            dispatcher(resetCartToSync());
            dispatcher(enqueueSuccessMessage('Корзина синхронизирована'));
            return;
        }

        try {
            if (repeatCounter > 2) {
                dispatcher(enqueueErrorMessage('Корзина не была синхронизирована'));
                return;
            }

            const results = await Promise.all(syncList.current.map(record => updateCart(record).unwrap()));
            const resultsMap = makeRequestsSuccessMap(results, syncList.current);

            if (!resultsMap.includes(false)) {
                cleanCartToSync();
                dispatcher(enqueueSuccessMessage('Корзина синхронизирована'));
                return;
            }

            setRepeatCounter(current => current + 1);
        } catch (e) {
            dispatcher(enqueueErrorMessage('Ошибка при синхронизации корзины'));
            console.error('Error during synchronizing the cart: ', e);
        } finally {
            isInSync.current = false;
        }
    }

    function cleanCartToSync() {
        dispatcher(resetCartToSync());
    }
}

function checkError(data: DefaultResponseType | CartType) {
    if ('error' in data && data.error && 'message' in data) {
        throw Error(data.message);
    }
}

function makeRequestsSuccessMap(results: (DefaultResponseType | CartType)[], list: ICartItem[]): boolean[] {
    const resultsMap: boolean[] = [];

    list.forEach((record, i) => {
        if ('items' in results[i]) {
            const foundItem = (results[i] as CartType).items?.find(item => (
                item.product.id === record.productId && item.quantity === record.quantity
            ));
            resultsMap.push(!!foundItem);
        } else {
            resultsMap.push(false);
        }
    });

    return resultsMap;
}