import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import CartService from "../../services/CartService";
import { ItemSize, ItemType } from "../../lib/enums/order.enum";
import type { RootState } from "../../store"; // adjust path to your store types

const cartService = new CartService();
const STORAGE_KEY = "underdogs_cart";

export type CartLineItem = {
  productId: string;
  itemType: ItemType;
  itemSize: ItemSize;
  itemQuantity: number;
  itemName: string;
  itemPrice: number;
  imageUrl: string;
};

//* loadCartFromStorage
function loadCartFromStorage(): CartLineItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveCartToStorage(items: CartLineItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // storage unavailable/full — cart just won't persist this session
  }
}

//* CHECKOUT
export const checkout = createAsyncThunk(
  "cart/checkout",
  async (_, { getState }) => {
    const state = getState() as RootState;
    const items = state.cart.items.map((i) => ({
      productId: i.productId,
      itemType: i.itemType,
      itemSize: i.itemSize,
      itemQuantity: i.itemQuantity,
    }));
    return await cartService.createOrderBulk(items);
  },
);

type CartState = {
  items: CartLineItem[];
  checkoutStatus: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: CartState = {
  items: loadCartFromStorage(),
  checkoutStatus: "idle",
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {

    addItem: (state, action: PayloadAction<CartLineItem>) => {
      const incoming = action.payload;
      const existing = state.items.find(
        (i) =>
          i.productId === incoming.productId &&
          i.itemSize === incoming.itemSize,
      );
      if (existing) {
        existing.itemQuantity += incoming.itemQuantity;
      } else {
        state.items.push(incoming);
      }
      saveCartToStorage(state.items);
    },

    increaseQuantity: (
      state,
      action: PayloadAction<{ productId: string; itemSize: ItemSize }>,
    ) => {
      const item = state.items.find(
        (i) =>
          i.productId === action.payload.productId &&
          i.itemSize === action.payload.itemSize,
      );
      if (item) item.itemQuantity += 1;
      saveCartToStorage(state.items);
    },

    decreaseQuantity: (
      state,
      action: PayloadAction<{ productId: string; itemSize: ItemSize }>,
    ) => {
      const item = state.items.find(
        (i) =>
          i.productId === action.payload.productId &&
          i.itemSize === action.payload.itemSize,
      );
      if (item && item.itemQuantity > 1) item.itemQuantity -= 1;
      saveCartToStorage(state.items);
    },

    removeItem: (
      state,
      action: PayloadAction<{ productId: string; itemSize: ItemSize }>,
    ) => {
      state.items = state.items.filter(
        (i) =>
          !(
            i.productId === action.payload.productId &&
            i.itemSize === action.payload.itemSize
          ),
      );
      saveCartToStorage(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      saveCartToStorage([]);
    },
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(checkout.pending, (state) => {
        state.checkoutStatus = "loading";
        state.error = null;
      })
      .addCase(checkout.fulfilled, (state) => {
        state.checkoutStatus = "succeeded";
        state.items = [];
        saveCartToStorage([]);
      })
      .addCase(checkout.rejected, (state, action) => {
        state.checkoutStatus = "failed";
        state.error = action.error.message ?? "Checkout failed";
      });
  },
});

export const {
  addItem,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
  clearCart,
  
} = cartSlice.actions;
export default cartSlice.reducer;
