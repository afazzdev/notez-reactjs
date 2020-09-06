import * as authSlice from "./auth.slice";
import Auth from "./Auth";

const { default: authReducer, ...authActions } = authSlice;

export { authReducer, authActions, Auth as default };
