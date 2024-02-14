import {cartAPI, enqueueErrorMessage, setCart} from "../store";
import {useAppDispatch} from "../hooks";

export async function fetchCart(dispatcher: ReturnType<typeof useAppDispatch>) {
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