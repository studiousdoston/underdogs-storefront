import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ProductService from "../../services/ProductService";
import type { Product } from "../../lib/types/product";

const productService = new ProductService();

//* FETCH PRODUCT
export const fetchProductById = createAsyncThunk(
  "product/fetchById",
  async (id: string) => {
    return await productService.getProductById(id);
  },
);

//* FETCH RELATED
export const fetchRelatedProducts = createAsyncThunk(
  "product/fetchRelated",
  async ({ id, limit }: { id: string; limit?: number }) => {
    return await productService.getRelatedProducts(id, limit);
  },
);

type ProductState = {
  current: Product | null;
  related: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: ProductState = {
  current: null,
  related: [],
  status: "idle",
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    resetProduct: (state) => {
      state.current = null;
      state.related = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.current = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to load product";
      })
      .addCase(fetchRelatedProducts.fulfilled, (state, action) => {
        state.related = action.payload;
      });
  },
});

export const { resetProduct } = productSlice.actions;
export default productSlice.reducer;
