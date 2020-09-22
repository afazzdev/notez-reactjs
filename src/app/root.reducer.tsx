import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "../features/auth";
import { dashboardReducer } from "../features/dashboard";

const rootReducer = combineReducers({
  auth: authReducer,
  dashboard: dashboardReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
