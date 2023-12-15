import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {createRoutesFromChildren} from "react-router-dom";

interface ICartState {
    count: number
}

const initialState: ICartState = {
    count: 0
}

export const cartReducer = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCount: (state, action: PayloadAction<number>) => {
            state.count = action.payload;
        }
    }
});

export const {setCount} = cartReducer.actions;