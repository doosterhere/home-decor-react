import {useMemo} from "react";

import {selectCart} from "../store";
import {useAppSelector} from "./redux";

export const useGetCountInCart = (id: string | undefined): [number, boolean] => {
    const cart = useAppSelector(selectCart);

    return useMemo(() => {
        const foundItem = cart.items.find(item => item.product.id === id);

        return [foundItem ? foundItem.quantity : 0, !!foundItem?.quantity];
    }, [cart, id]);
}