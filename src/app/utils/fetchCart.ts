import {cartAPI} from "../store";
import {useAppDispatch} from "../hooks";

export async function fetchCart(dispatcher: ReturnType<typeof useAppDispatch>) {
    const cartPromise = dispatcher(cartAPI.endpoints?.getCart.initiate());
    const refetchCartPromise = cartPromise.refetch.bind(cartPromise);

    return await refetchCartPromise()
        .unwrap()
        .finally(
            () => cartPromise.unsubscribe()
        );
}