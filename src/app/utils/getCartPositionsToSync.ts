import {CartItemType, CartType, ICartItem} from "../types";

export function getCartPositionsToSync(fetchedCart: CartType, cartToSync: CartType): ICartItem[] {
    if (!cartToSync.items.length) {
        return [];
    }

    if (cartToSync.items.length && fetchedCart.items.length) {
        const filteredItems = cartToSync.items.filter(item => compareCartItem(item, fetchedCart));

        return createPositions(filteredItems);
    }

    return createPositions(cartToSync.items);
}

function compareCartItem(comparedItem: CartItemType, comparedCart: CartType) {
    const foundItem = comparedCart.items.find(item => item.product.id === comparedItem.product.id);

    return (!foundItem || (foundItem && foundItem.quantity < comparedItem.quantity));
}

function createPositions(items: CartItemType[]) {
    return items.map(item => ({productId: item.product.id, quantity: item.quantity}));
}