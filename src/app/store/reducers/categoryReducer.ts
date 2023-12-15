import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {CategoryWithTypesType} from "../../types/categoryWithTypes.type";

interface ICategoriesState {
    categories: CategoryWithTypesType[];
}

const initialState: ICategoriesState = {
    categories: []
}

export const categoryReducer = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setCategoriesWithTypes: (state, action: PayloadAction<CategoryWithTypesType[]>) => {
            state.categories = action.payload;
        }
    }
});

export const {setCategoriesWithTypes} = categoryReducer.actions;