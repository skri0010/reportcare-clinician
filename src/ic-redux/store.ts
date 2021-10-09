import { createStore, Store } from "redux";
import { StateType } from "typesafe-actions";
// import { RootReducer } from "ic-redux/reducers/RootReducer";
import { RootReducer } from "./reducers/RootReducer";
import { persistStore } from "redux-persist";
import { RootAction } from "./actions/RootAction";

export type RootState = StateType<typeof RootReducer>;
// Refer to https://github.com/rt2zz/redux-persist/pull/1085#issuecomment-602094856
// A typescript error would occur if <RootState, RootAction, any, any> is not added for the createStore
// A patch was created to resolve this error but it has not been merged into the module
export const store: Store<RootState> = createStore<
  RootState,
  RootAction,
  any,
  any
>(RootReducer);
export const persistor = persistStore(store);
