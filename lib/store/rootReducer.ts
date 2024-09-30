import { type AnyAction, combineReducers, type Reducer } from "redux";
import cartSlice from "./features/cart";
import { type AppState } from ".";

export const combinedReducer = combineReducers({
  cart: cartSlice,
});

const rootReducer: Reducer = (state: AppState, action: AnyAction) => {
  return combinedReducer(state, action);
};

export default rootReducer;
