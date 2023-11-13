import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {categorySlice} from "./reducers/categorySlice";
import {productAPI} from "./services/productService";

const rootReducer = combineReducers({
    category: categorySlice.reducer,
    [productAPI.reducerPath]: productAPI.reducer
});

const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => {
            return getDefaultMiddleware().concat(productAPI.middleware)
        }
    });
};

export {setupStore};
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];