import { type PayloadAction } from "@reduxjs/toolkit";
import { type ICart, type IProductCart } from "./type";

export const cartReducer = {
  addToCart(state: ICart, action: PayloadAction<IProductCart>) {
    const filterProduct = state.products.find((product: IProductCart) => product.id === action.payload.id);

    if (!filterProduct) {
      if (action.payload.count > 0) {
        const filterOtherProduct = state.products.filter((product: IProductCart) => product.id !== action.payload.id);
        const newProduct: IProductCart = {
          ...action.payload,
        };

        state.products = [newProduct, ...filterOtherProduct];
        state.totalProduct = state.totalProduct + action.payload.count;
      }
    } else {
      const oldProducts = [...state.products];
      for (const product of oldProducts) {
        if (product.id === action.payload.id) {
          product.count = product.count + action.payload.count;
        }
      }

      state.products = [...oldProducts];
      state.totalProduct = state.totalProduct + action.payload.count;
    }
  },
  removeFromCart(state: ICart, action: PayloadAction<string>) {
    const filterOtherProduct = state.products.filter((product: IProductCart) => product.id !== action.payload);
    const filterProduct = state.products.find((product: IProductCart) => product.id === action.payload);

    state.totalProduct = state.totalProduct - (filterProduct?.count || 0);
    state.products = [...filterOtherProduct];
  },
};
