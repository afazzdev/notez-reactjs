import { configureStore } from "@reduxjs/toolkit";
import reducer from "./root.reducer";

const store = configureStore({
  reducer,
});

export default store;
