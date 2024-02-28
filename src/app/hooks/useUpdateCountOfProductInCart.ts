import {cartAPI, enqueueErrorMessage, setCart, setNeedCartRefetch} from "../store";
import {useAppDispatch} from "./redux";

export const useUpdateCountOfProductInCart = () => {
    const dispatcher = useAppDispatch();
    const [updateCart] = cartAPI.useUpdateCartMutation();

    return async (id: string | undefined, quantity: number) => {
        if (id) {
            await updateCart({
                productId: id,
                quantity: quantity
            })
                .then(res => {
                    if (res && 'data' in res && 'items' in res.data) {
                        dispatcher(setCart(res.data));
                        return;
                    }

                    dispatcher(setNeedCartRefetch());
                    dispatcher(enqueueErrorMessage('Произошла ошибка, обновите страницу и повторите попытку'));
                })
                .catch(() => {
                    dispatcher(enqueueErrorMessage('Произошла ошибка, попробуйте позже'));
                });
        }
    };
}