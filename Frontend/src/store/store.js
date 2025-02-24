import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage'

import authSlice from "./authSlice";
// import jobSlice from "./jobSlice";
// import companySlice from "./companySlice";
// import applicationSlice from "./applicationSlice";

import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

const rootReducer = combineReducers({
    auth:authSlice,
    // job:jobSlice,
    // company:companySlice,
    // application:applicationSlice
})

/*  //* above code is for using redux toolkit , but for incresing login or signup time i have used the other code , due to it if you reload the page or website no need to re-login or signup , it will automatically login or signup ,that why i have used the other code 
    import { configureStore } from '@reduxjs/toolkit'

    export const store = configureStore({
      reducer: {
      auth:authSlice,
      job:jobSlice,
      company:companySlice,
      application:applicationSlice
      },
    }) 
*/

const persistedReducer = persistReducer(persistConfig, rootReducer)

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