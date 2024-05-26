import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
import {useEffect} from "react";

export interface productState {
  products: CartProduct[];
}

const initialState: productState = {
  products: [],
};

export const shoppingSlice = createSlice({
  name: "shopping",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingProduct = state.products.find(
        (item: CartProduct) => item._id === action.payload._id
      );
      if (existingProduct) {
        existingProduct.quantity += action.payload.quantity;
      } else {
        state.products.push(action.payload);
      }
    },
    increaseQuantity: (state, action) => {
      const existingProduct = state.products.find(
        (item: CartProduct) => item._id === action.payload._id
      );
      if (existingProduct) {
        existingProduct.quantity++;
      }
    },
    decreaseQuantity: (state, action) => {
      const existingProduct = state.products.find(
        (item: CartProduct) => item._id === action.payload._id
      );
      if (existingProduct?.quantity === 1) {
        existingProduct.quantity = 1;
      } else {
        existingProduct && existingProduct.quantity--;
      }
    },
    deleteQuantity: (state, action) => {
      state.products = state.products.filter(
        (item) => item._id != action.payload
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const {addToCart, increaseQuantity, decreaseQuantity, deleteQuantity} =
  shoppingSlice.actions;

export default shoppingSlice.reducer;
