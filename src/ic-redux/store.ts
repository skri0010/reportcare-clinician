import { createStore } from "redux";
import { StateType } from "typesafe-actions";
// import { RootReducer } from "ic-redux/reducers/RootReducer";
import { RootReducer } from "./reducers/RootReducer";

export const store = createStore(RootReducer);

export type RootState = StateType<typeof RootReducer>;
