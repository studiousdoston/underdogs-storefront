import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import OrderService, { type OrderDto } from "../../services/OrderService";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "@/lib/sweetAlert";

const orderService = new OrderService();

//* FETCH ALL (all statuses; frontend buckets by tab)
export const fetchMyOrders = createAsyncThunk("order/fetchMine", async () => {
  const result = await orderService.getMyOrders();
  return result.data;
});

//* PAY
export const payOrder = createAsyncThunk(
  "order/pay",
  async (orderId: string, { rejectWithValue }) => {
    try {
      const result = await orderService.payOrder(orderId);
      await sweetTopSmallSuccessAlert("Order paid!");
      return result;
    } catch (err) {
      await sweetErrorHandling(err);
      return rejectWithValue(err);
    }
  },
);

//* DELETE
export const deleteOrder = createAsyncThunk(
  "order/delete",
  async (orderId: string, { rejectWithValue }) => {
    try {
      await orderService.deleteOrder(orderId);
      await sweetTopSmallSuccessAlert("Order cancelled");
      return orderId;
    } catch (err) {
      await sweetErrorHandling(err);
      return rejectWithValue(err);
    }
  },
);

type OrderState = {
  orders: OrderDto[];
  status: "idle" | "loading" | "succeeded" | "failed";
};

const initialState: OrderState = {
  orders: [],
  status: "idle",
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload;
      })
      .addCase(fetchMyOrders.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(payOrder.fulfilled, (state, action) => {
        const idx = state.orders.findIndex((o) => o._id === action.payload._id);
        if (idx !== -1)
          state.orders[idx] = { ...state.orders[idx], ...action.payload };
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.orders = state.orders.filter((o) => o._id !== action.payload);
      });
  },
});

export default orderSlice.reducer;
