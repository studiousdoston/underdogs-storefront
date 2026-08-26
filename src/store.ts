import { configureStore } from "@reduxjs/toolkit";
import memberReducer from "./features/auth/memberSlice";
import productReducer from "./features/product/productSlice";
import cartReducer from "./features/cart/CartSlice";

export const store = configureStore({
  reducer: {
    member: memberReducer,
    product: productReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
