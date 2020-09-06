import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import reducer, { RootState } from "./root.reducer";

const store = configureStore({
  reducer,
});

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export default store;
