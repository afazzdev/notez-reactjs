import { createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "../../app/store";

interface IDataAuth {
  username: string;
  password: string;
}

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLogin: false,
  },
  reducers: {
    setLogin(state) {
      state.isLogin = true;
    },
  },
});

export const { setLogin } = authSlice.actions;

export const login = (data: IDataAuth): AppThunk => async (dispatch) => {};

export default authSlice.reducer;
