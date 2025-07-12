// appStore.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import productsReducer from "./productSlice";
import cartReducer from "./cartSlice";
import userReducer from "./userSlice";

import storage from "redux-persist/lib/storage"; // defaults to localStorage
import { persistReducer, persistStore } from "redux-persist";

// configure persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"], // only persist cart
};

// combine all reducers
const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  user: userReducer,
});

// wrap rootReducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// configure store
const appStore = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(appStore);
export default appStore;
