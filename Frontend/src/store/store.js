// import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import storage from 'redux-persist/lib/storage';
// import authSlice from "./authSlice";
// import productSlice from "./productSlice";
// import wishListSlice from "./wishListSlice";

// import {
//     persistReducer,
//     FLUSH,
//     REHYDRATE,
//     PAUSE,
//     PERSIST,
//     PURGE,
//     REGISTER,
// } from 'redux-persist';

// const persistConfig = {
//     key: 'root',
//     version: 1,
//     storage,
// };

// const rootReducer = combineReducers({
//     auth: authSlice,
//     product: productSlice,
//     wishlist: wishListSlice,

// });

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//     reducer: persistedReducer,
//     middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware({
//             serializableCheck: {
//                 ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//             },
//         }),
// });

// export default store;

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import authSlice from "./authSlice";
import productSlice from "./productSlice";
import wishListSlice from "./wishListSlice";
import ratingReducer from './ratingSlice';
import likeReducer from './likeSlice';

import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
};

const rootReducer = combineReducers({
    auth: authSlice,
    product: productSlice,
    wishlist: wishListSlice, // ✅ Make sure this matches slice name
    rating: ratingReducer,
    like: likeReducer, // ✅ Make sure this matches slice name
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export default store;
