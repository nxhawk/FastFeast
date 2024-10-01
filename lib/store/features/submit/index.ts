import { createSlice } from "@reduxjs/toolkit";
import { Store } from "../../name";
import { type ISubmit } from "./type";
import { submitReducer } from "./reducer";

const initialState: ISubmit = {
  isSubmit: false,
};

const submitSlice = createSlice({
  name: Store.SUBMIT,
  initialState,
  reducers: submitReducer,
});

const { actions, reducer } = submitSlice;

export const { changeStateIsSubmit } = actions;

export default reducer;
