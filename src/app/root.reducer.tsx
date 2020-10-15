import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "../features/auth";
import notesReducer from "../features/notes/notes.slice";

const rootReducer = combineReducers({
  auth: authReducer,
  notes: notesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
