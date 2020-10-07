import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "../features/auth";
import { dashboardReducer } from "../features/dashboard";
import notesReducer from "../features/notes/notes.slice";

const rootReducer = combineReducers({
  auth: authReducer,
  dashboard: dashboardReducer,
  notes: notesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
