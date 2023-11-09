import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {categorySlice} from "./reducers/categorySlice";

const rootReducer = combineReducers({
    category: categorySlice.reducer
});

const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    });
};

export {setupStore};
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];