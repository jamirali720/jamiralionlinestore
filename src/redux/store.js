import { combineReducers, configureStore } from "@reduxjs/toolkit";

import cartSlice from "./features/cartSlice";
import { productsApi } from "./api/productsApi";
import filterSlice from "./features/filterSlice";
import storageSession from "redux-persist/lib/storage/session";
import { FLUSH, persistReducer,PAUSE, PERSIST, PURGE, REGISTER, persistStore, REHYDRATE } from "redux-persist";
import { ordersApi } from "./api/orderApi";
import { teamApi } from "./api/teamApi";


const persistConfig = {
  key: "cart",
  storage: storageSession,
  blacklist: ["filter",productsApi.reducerPath,  ordersApi.reducerPath, teamApi.reducerPath], // Exclude filter slice from persisting
};
const rootReducer = combineReducers({
  cart: cartSlice,
  filter: filterSlice,  
  [productsApi.reducerPath]: productsApi.reducer,
  [ordersApi.reducerPath]: ordersApi.reducer,
  [teamApi.reducerPath]: teamApi.reducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer:persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([productsApi.middleware, ordersApi.middleware, teamApi.middleware]),
});

export const persistor = persistStore(store);