import {useMemo} from "react";

import {CartType, DefaultResponseType, ICartItem} from "../types";

export function useCart(cartData: CartType | DefaultResponseType | undefined) {
    return useMemo(() => {
        const initial = {
            items: [] as ICartItem[],
            itemsCount: 0
        };

        if (cartData && 'items' in cartData && cartData.items.length) {
            return cartData.items.reduce((acc, current) => ({
                items: [...acc.items, {productId: current.product.id, quantity: current.quantity} as ICartItem],
                itemsCount: acc.itemsCount + current.quantity
            }), initial);
        }

        return initial;
    }, [cartData]);
}