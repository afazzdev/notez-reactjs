import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import reducer, { RootState } from "./root.reducer";

const store = configureStore({
  reducer,
});

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export type AppDispatchType = typeof store.dispatch;

export default store;
