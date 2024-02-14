import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CartType} from "../../types";

interface ICartState {
    count: number;
    cart: CartType;
    needRefetch: boolean;
}

const initialState: ICartState = {
    count: 0,
    cart: {items: []},
    needRefetch: false
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
        })
    }),
    selectors: {
        selectCartCount: (state) => state.count,
        selectCart: (state) => state.cart,
        selectNeedRefetch: (state) => state.needRefetch
    }
});

export const {setCartCount, setCart, setNeedCartRefetch, resetNeedCartRefetch} = cartReducer.actions;
export const {selectCartCount, selectCart, selectNeedRefetch} = cartReducer.selectors;