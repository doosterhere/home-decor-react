import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {CategoryWithTypesType} from "../../types/categoryWithTypes.type";
import {fetchCategories} from "./categoryActionCreator";

interface ICategoriesState {
    categories: CategoryWithTypesType[];
    isLoading: boolean;
    error: string | null;
}

const initialState: ICategoriesState = {
    categories: [],
    isLoading: false,
    error: null
}

const pending: string = fetchCategories.pending.type;
const fulfilled: string = fetchCategories.fulfilled.type;
const rejected: string = fetchCategories.rejected.type;

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fulfilled, (state, action: PayloadAction<CategoryWithTypesType[]>) => {
                state.isLoading = false;
                state.categories = action.payload;
            })
            .addCase(rejected, (state, action: PayloadAction<string>) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    }
});