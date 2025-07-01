import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productSlice";
import cartReducer from "./cartSlice";
const appStore = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
  },
});

export default appStore;
