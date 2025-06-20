// src/store/selectors/productSelectors.ts
import { useSelector } from "react-redux";
import { RootState } from "../store";

export const AllProducts = () =>
  useSelector((state: RootState) => state.products.products);
export const LoadingProducts = () =>
  useSelector((state: RootState) => state.products.loading);

export const selectProductError = (state: RootState) => state.products.error;
export const selectSelectedProduct = (state: RootState) =>
  state.products.selectedProduct;
