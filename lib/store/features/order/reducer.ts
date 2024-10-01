import { type PayloadAction } from "@reduxjs/toolkit";
import { type IOldOrder } from "./type";

export const orderReducer = {
  storeOrder(state: IOldOrder, action: PayloadAction<IOldOrder>) {
    state.address = action.payload.address;
    state.id = action.payload.id;
    state.totalPrice = action.payload.totalPrice;
    state.paymentMethod = action.payload.paymentMethod;
    state.fullName = action.payload.fullName;
    state.phoneNumber = action.payload.phoneNumber;
    state.address = action.payload.address;
  },
};
