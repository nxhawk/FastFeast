import { createSlice } from "@reduxjs/toolkit";
import { Store } from "../../name";
import { type IOldOrder } from "./type";
import { orderReducer } from "./reducer";

const initialState: IOldOrder = {
  id: "",
  totalPrice: 0,
  paymentMethod: "cash",
  fullName: "",
  phoneNumber: "",
  address: "",
};

const orderSlice = createSlice({
  name: Store.ORDER,
  initialState,
  reducers: orderReducer,
});

const { actions, reducer } = orderSlice;

export const { storeOrder } = actions;

export default reducer;
