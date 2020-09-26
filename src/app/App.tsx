import React from "react";
import {
  BrowserRouter,
  Route,
  Switch,
  RouteProps,
  Redirect,
} from "react-router-dom";
import { Provider, useSelector } from "react-redux";

import store from "./store";
import MuiProvider from "./Mui.provider";

import Home from "../features/home";
import Auth from "../features/auth";
import Dashboard from "../features/dashboard";
import { getUserAsync } from "../features/auth/auth.slice";
import { RootState } from "./root.reducer";

store.dispatch(getUserAsync());

const SecureRoute = ({ component: Component, ...rest }: RouteProps) => {
  const state = useSelector((state: RootState) => state.auth);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (
          state.isLogin &&
          ["/signup", "/signin", "/"].includes(rest.location?.pathname!)
        ) {
          return <Redirect to={`/@${state.user.username}`} from="/" />;
        } else if (
          (state.isLogin &&
            !["/signup", "/signin"].includes(rest.location?.pathname!)) ||
          (!state.isLogin &&
            ["/signup", "/signin", "/"].includes(rest.location?.pathname!))
        ) {
          return React.createElement(Component!, props);
        } else {
          return <Redirect to="/signin" />;
        }
      }}
    />
  );
};

function App() {
  return (
    <Provider store={store}>
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
                  defaultRoute="/"
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
    </Provider>
  );
}

export default App;
