import { createSlice } from "@reduxjs/toolkit";
import auth, { IDataFromApi, IUser } from "../../api/auth";
import { AppThunk } from "../../app/store";

interface IState {
  isLogin: boolean;
  isLoading: boolean;
  token: Pick<IDataFromApi, "token"> | null;
  message: Pick<IDataFromApi, "message"> | null;
  user: IUser & { photo: string };
}

const initialState: IState = {
  isLogin: false,
  isLoading: false,
  token: null,
  message: null,
  user: {
    username: "placeholder",
    photo: "placeholder",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState as IState,
  reducers: {
    setLogin(state, { payload }) {
      state.isLogin = payload;
    },
    setLoading(state, { payload }) {
      state.isLoading = payload;
    },
    setUser(state, { payload }) {
      state.user = payload;
    },
    setToken(state, { payload }) {
      state.token = payload;
    },
    setErrorMessage(state, { payload }) {
      state.message = payload;
    },
    editUser: (state, { payload }) => {
      state.user.username = payload.username;
    },
  },
});

export const {
  setLogin,
  editUser,
  setLoading,
  setUser,
  setToken,
  setErrorMessage,
} = authSlice.actions;

export const signUp = (data: IUser): AppThunk<Promise<IDataFromApi>> => async (
  dispatch,
) => {
  // Set app to loading state
  dispatch(setLoading(true));
  try {
    // Try Authentication process
    const user = await auth.signUp(data);
    // If resolved then change app state to Login = true
    dispatch(setLogin(true));
    const { data: resData, token } = user;
    // Set token to localStorage
    localStorage.setItem("token", token!);
    // And save the data to reducer
    dispatch(setToken(token));
    dispatch(setUser(resData));
    return user;
  } catch (error) {
    console.log(error);
    // If the error is from backend response
    if (error.response) {
      // Set state.message to error response message
      dispatch(setErrorMessage(error.response.data.message));
      // Delete the message after some time
      setTimeout(() => {
        dispatch(setErrorMessage(""));
      }, 5000);

      // returning the error value to next catch
      return error.response;
    } else {
      // otherwise return generic error
      return error;
    }
  } finally {
    // Change app state loading to false after promise resolved or rejected
    dispatch(setLoading(false));
  }
};

export const signIn = (data: IUser): AppThunk<Promise<IDataFromApi>> => async (
  dispatch,
) => {
  // Set app to loading state
  dispatch(setLoading(true));
  try {
    // Try Authentication process
    const user = await auth.signIn(data);
    // If resolved then change app state to Login = true
    dispatch(setLogin(true));
    const { data: resData, token } = user;
    // Set token to localStorage
    localStorage.setItem("token", token!);
    // And save the data to reducer
    dispatch(setToken(token));
    dispatch(setUser(resData));
    return user;
  } catch (error) {
    console.log(error);
    // If the error is from backend response
    if (error.response) {
      // Set state.message to error response message
      dispatch(setErrorMessage(error.response.data.message));
      // Delete the message after some time
      setTimeout(() => {
        dispatch(setErrorMessage(""));
      }, 5000);

      // returning the error value to next catch
      return error.response;
    } else {
      // otherwise return generic error
      return error;
    }
  } finally {
    // Change app state loading to false after promise resolved or rejected
    dispatch(setLoading(false));
  }
};

export default authSlice.reducer;
