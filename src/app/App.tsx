import React, { useEffect } from "react";
import {
  BrowserRouter,
  Route,
  Switch,
  RouteProps,
  Redirect,
} from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { AppDispatchType } from "./store";
import MuiProvider from "./Mui.provider";

import Home from "../features/home";
import Auth from "../features/auth";
import Dashboard from "../features/dashboard";
import { getUserAsync } from "../features/auth/auth.slice";
import { RootState } from "./root.reducer";
import FullLoading from "../components/loader/FullLoading";

const SecureRoute = React.memo(
  ({ component: Component, ...rest }: RouteProps) => {
    const { user, isLogin } = useSelector(
      (state: RootState) => state.auth,
      shallowEqual,
    );

    console.log("secure route rerendered");
    return (
      <Route
        {...rest}
        render={(props) => {
          if (
            isLogin &&
            ["/signup", "/signin", "/"].includes(rest.location?.pathname!)
          ) {
            return <Redirect to={`/@${user.username}`} from="/" />;
          } else if (
            (isLogin &&
              !["/signup", "/signin"].includes(rest.location?.pathname!)) ||
            (!isLogin &&
              ["/signup", "/signin", "/"].includes(rest.location?.pathname!))
          ) {
            // @ts-ignore
            return <Component {...props} />;
          } else {
            return <Redirect to="/signin" />;
          }
        }}
      />
    );
  },
);

function App() {
  const initLoading = useSelector((state: RootState) => state.auth.initLoading);
  const dispatch = useDispatch<AppDispatchType>();

  useEffect(() => {
    console.log("fired 1");
    dispatch(getUserAsync());
  }, [dispatch]);

  if (initLoading) {
    return <FullLoading />;
  }

  console.log("fired 2");
  return (
    <MuiProvider>
      <BrowserRouter>
        <Switch>
          <SecureRoute path="/@:username" component={Dashboard} />

          <SecureRoute
            path="/"
            // exact
            component={(props: any) => (
              <Home
                {...props}
                routes={[
                  { label: "Sign In", path: "/signin" },
                  { label: "Sign Up", path: "/signup" },
                ]}
                defaultRoute="/signin"
              >
                <Route
                  path="/signin"
                  render={(props: any) => (
                    <Auth componentFor="signIn" {...props} />
                  )}
                />
                <Route
                  path="/signup"
                  render={(props: any) => (
                    <Auth componentFor="signUp" {...props} />
                  )}
                />
              </Home>
            )}
          />
        </Switch>
      </BrowserRouter>
    </MuiProvider>
  );
}

export default App;
