import {combineReducers, configureStore} from "@reduxjs/toolkit";

import {categoryReducer} from "./reducers/categoryReducer";
import {cartReducer} from "./reducers/cartReducer";
import {productAPI} from "./api/productApi";
import {cartAPI} from "./api/cartApi";
import {typeApi} from "./api/typeApi";

const rootReducer = combineReducers({
    category: categoryReducer.reducer,
    cart: cartReducer.reducer,
    [productAPI.reducerPath]: productAPI.reducer,
    [cartAPI.reducerPath]: cartAPI.reducer,
    [typeApi.reducerPath]: typeApi.reducer
});

const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware()
                .concat(
                    productAPI.middleware,
                    cartAPI.middleware,
                    typeApi.middleware
                )
    });
};

export {setupStore};
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];