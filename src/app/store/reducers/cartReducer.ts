import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export const cartReducer = createSlice({
    name: 'cart',
    initialState: {
        count: 0
    },
    reducers: (create) => ({
        setCartCount: create.reducer((state, action: PayloadAction<number>) => {
            state.count = action.payload;
        })
    }),
    selectors: {
        selectCartCount: (state) => state.count
    }
});

export const {setCartCount} = cartReducer.actions;
export const {selectCartCount} = cartReducer.selectors;