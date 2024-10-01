import { type PayloadAction } from "@reduxjs/toolkit";
import { type ISubmit } from "./type";

export const submitReducer = {
  changeStateIsSubmit(state: ISubmit, action: PayloadAction<boolean>) {
    state.isSubmit = action.payload;
  },
};
