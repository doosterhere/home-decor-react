import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {CategoryWithTypesType} from "../../types";

interface ICategoriesState {
    categories: CategoryWithTypesType[];
}

const initialState: ICategoriesState = {
    categories: []
}

export const categoryReducer = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setCategoriesWithTypes: (state, action: PayloadAction<CategoryWithTypesType[]>) => {
            state.categories = action.payload;
        },
    },
    selectors: {
        selectCategories: (state) => state
    }
});

export const {setCategoriesWithTypes} = categoryReducer.actions;
export const {selectCategories} = categoryReducer.selectors;