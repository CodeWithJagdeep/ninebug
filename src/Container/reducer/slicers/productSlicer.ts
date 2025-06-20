// src/store/slices/productSlice.ts
import _ApiServices from "@/Services/apiServices";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

/**
 * Product data structure
 */
export interface Product {
  id: string;
  name: string;
  price: number;
  premium: boolean;
  description?: string;
  features: string[];
}

/**
 * Redux state structure for product management
 */
interface ProductState {
  products: Product[];
  selectedProduct: Product | null;
  loading: boolean;
  error: string | null;
  lastFetched: number | null;
}

const initialState: ProductState = {
  products: [],
  selectedProduct: null,
  loading: false,
  error: null,
  lastFetched: null,
};

/**


/**
 * Error handler utility
 */
const handleError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return "An unknown error occurred";
};

/**
 * Async Thunks
 */
export const fetchProducts = createAsyncThunk<
  Product[],
  void,
  { rejectValue: string }
>("products/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const response = await new _ApiServices(
      "/payment/plans",
      {}
    )._handleGetRequest();
    console.log();
    return response.data.products;
  } catch (error) {
    console.log(error);
    return rejectWithValue(handleError(error));
  }
});

export const fetchProductById = createAsyncThunk<
  Product,
  string,
  { rejectValue: string }
>("products/fetchById", async (id: string, { rejectWithValue }) => {
  try {
    const response = await new _ApiServices(
      `/product/${id}`,
      {}
    )._handleGetRequest();
    return response;
    // return normalizeProductData(response.data);
  } catch (error) {
    return rejectWithValue(handleError(error));
  }
});

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
    resetProductState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.products = action.payload;
          state.loading = false;
          state.lastFetched = Date.now();
        }
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch products";
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProductById.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.selectedProduct = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch product details";
      });
  },
});

export const { clearSelectedProduct, resetProductState } = productSlice.actions;
export default productSlice.reducer;
