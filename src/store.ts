import { configureStore } from "@reduxjs/toolkit";
import memberReducer from "./features/auth/memberSlice";
import productReducer from "./features/product/productSlice";
import cartReducer from "./features/cart/cartSlice";
import orderReducer from "./features/order/orderSlice";
export const store = configureStore({
  reducer: {
    member: memberReducer,
    product: productReducer,
    cart: cartReducer,
    order: orderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
