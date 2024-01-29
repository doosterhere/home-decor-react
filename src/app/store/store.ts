import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer,
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    REHYDRATE
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import {categoryReducer} from "./reducers/categoryReducer";
import {messageReducer} from "./reducers/messageReducer";
import {authReducer} from "./reducers/authReducer";
import {cartReducer} from "./reducers/cartReducer";
import {productAPI} from "./api/productApi";
import {typeApi} from "./api/typeApi";
import {authApi} from "./api/authApi";
import {cartAPI} from "./api/cartApi";
import {favoritesApi} from "./api/favoritesApi";

const persistConfig = {
    key: 'root',
    storage,
    blacklist: [
        messageReducer.reducerPath,
        productAPI.reducerPath,
        typeApi.reducerPath,
        authApi.reducerPath,
        cartAPI.reducerPath,
        favoritesApi.reducerPath
    ]
}

const rootReducer = combineReducers({
    categories: categoryReducer.reducer,
    message: messageReducer.reducer,
    auth: authReducer.reducer,
    cart: cartReducer.reducer,
    [productAPI.reducerPath]: productAPI.reducer,
    [typeApi.reducerPath]: typeApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [cartAPI.reducerPath]: cartAPI.reducer,
    [favoritesApi.reducerPath]: favoritesApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        }).concat(
            productAPI.middleware,
            typeApi.middleware,
            authApi.middleware,
            cartAPI.middleware,
            favoritesApi.middleware,
        )
});

const persistor = persistStore(store);

export {store, persistor};
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;