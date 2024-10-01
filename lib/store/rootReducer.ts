import { type AnyAction, combineReducers, type Reducer } from "redux";
import cartSlice from "./features/cart";
import submitSlice from "./features/submit";
import orderSlice from "./features/order";
import { type AppState } from ".";

export const combinedReducer = combineReducers({
  cart: cartSlice,
  submit: submitSlice,
  order: orderSlice,
});

const rootReducer: Reducer = (state: AppState, action: AnyAction) => {
  return combinedReducer(state, action);
};

export default rootReducer;
