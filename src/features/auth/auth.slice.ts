import { createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "../../app/store";

interface IDataAuth {
  username: string;
  password: string;
}

interface IDataFromApi {
  id: string;
  photo: string;
}

interface IState {
  isLogin: boolean;
  user: Omit<IDataAuth, "password"> & IDataFromApi;
}

const initialState: IState = {
  isLogin: false,
  user: {
    id: "",
    username: "placeholder",
    photo: "placeholder",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState as IState,
  reducers: {
    setLogin(state) {
      state.isLogin = true;
    },
    editUser: (state, { payload }) => {
      state.user.username = payload.username;
    },
  },
});

export const { setLogin, editUser } = authSlice.actions;

export const login = (data: IDataAuth): AppThunk => async (dispatch) => {};

export default authSlice.reducer;
