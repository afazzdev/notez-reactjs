import { createSlice } from "@reduxjs/toolkit";
import auth, { IDataFromApi, IUser } from "../../api/auth";
import { AppThunk } from "../../app/store";

interface IState {
  initLoading: boolean;
  isLogin: boolean;
  isLoading: boolean;
  token: string | null;
  message: Pick<IDataFromApi, "message"> | null;
  user: IUser & { photo: string };
  [key: string]: any;
}

const initialState: IState = {
  initLoading: false,
  isLogin: false,
  isLoading: false,
  token: null,
  message: null,
  user: {
    username: "",
    photo: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState as IState,
  reducers: {
    setInitLoading(state, { payload }) {
      state.initLoading = payload;
    },
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
    logOut(state: IState) {
      localStorage.removeItem("token");
      // state = initialState;
      Object.keys(state).forEach((key) => {
        state[key] = initialState[key];
      });
    },
  },
});

export const {
  setInitLoading,
  setLogin,
  editUser,
  setLoading,
  setUser,
  setToken,
  setErrorMessage,
  logOut,
} = authSlice.actions;

var deleteErrorMessage: any = null;

export const signUp = (data: IUser): AppThunk<Promise<IDataFromApi>> => async (
  dispatch,
) => {
  // Set app to loading state
  clearTimeout(deleteErrorMessage);
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
      deleteErrorMessage = setTimeout(() => {
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
    // dispatch(setLoading(false));
  }
};

// @ts-ignore
export const signIn = (data: IUser): AppThunk<Promise<IDataFromApi>> => async (
  // @ts-ignore
  dispatch,
) => {
  // // Set app to loading state
  clearTimeout(deleteErrorMessage);
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
      deleteErrorMessage = setTimeout(() => {
        dispatch(setErrorMessage(""));
      }, 5000);
      // returning the error value to next catch
      throw error.response;
    } else {
      // otherwise return generic error
      throw error;
    }
  } finally {
    //   // Change app state loading to false after promise resolved or rejected
    dispatch(setLoading(false));
  }
};

export const getUserAsync = (): AppThunk => async (dispatch) => {
  const token = localStorage.getItem("token");
  dispatch(setInitLoading(true));

  if (token) {
    try {
      const user = await auth.getUser(token);
      dispatch(setToken(user.token));
      dispatch(setUser(user.data));
      dispatch(setLogin(true));
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) localStorage.removeItem("token");
        setErrorMessage(error.response.message);
      }
    }
  }
  dispatch(setInitLoading(false));
};

export default authSlice.reducer;
