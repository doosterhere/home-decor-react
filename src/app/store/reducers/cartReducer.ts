import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {CartType} from "../../types";

interface ICartState {
    count: number;
    cart: CartType;
    needRefetch: boolean;
    cartToSync: CartType;
    newCartHasBeenReceived: boolean;
}

const initialState: ICartState = {
    count: 0,
    cart: {items: []},
    needRefetch: false,
    cartToSync: {items: []},
    newCartHasBeenReceived: false
}

export const cartReducer = createSlice({
    name: 'cart',
    initialState,
    reducers: (create) => ({
        setCartCount: create.reducer((state, action: PayloadAction<number>) => {
            state.count = action.payload;
        }),
        setCart: create.reducer((state, action: PayloadAction<CartType>) => {
            state.cart = action.payload;
        }),
        setNeedCartRefetch: create.reducer((state) => {
            state.needRefetch = true;
        }),
        resetNeedCartRefetch: create.reducer((state) => {
            state.needRefetch = false;
        }),
        setCartToSync: create.reducer((state) => {
            state.cartToSync = structuredClone(state.cart) as CartType;
        }),
        resetCartToSync: create.reducer((state) => {
            state.cartToSync = {items: []};
        }),
        setNewCartHasBeenReceived: create.reducer((state) => {
            state.newCartHasBeenReceived = true;
        }),
        resetNewCartHasBeenReceived: create.reducer((state) => {
            state.newCartHasBeenReceived = false;
        })
    }),
    selectors: {
        selectCartCount: (state) => state.count,
        selectCart: (state) => state.cart,
        selectNeedRefetch: (state) => state.needRefetch,
        selectCartToSync: (state) => state.cartToSync,
        selectNewCartHasBeenReceived: (state) => state.newCartHasBeenReceived
    }
});

export const {
    setCartCount,
    setCart,
    setNeedCartRefetch,
    resetNeedCartRefetch,
    setCartToSync,
    resetCartToSync,
    setNewCartHasBeenReceived,
    resetNewCartHasBeenReceived
} = cartReducer.actions;
export const {
    selectCartCount,
    selectCart,
    selectNeedRefetch,
    selectCartToSync,
    selectNewCartHasBeenReceived
} = cartReducer.selectors;