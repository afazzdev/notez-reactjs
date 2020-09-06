import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./store";
import MuiProvider from "./Mui.provider";

import Home from "../features/home";
import Auth from "../features/auth";
import Dashboard from "../features/dashboard";

function App() {
  return (
    <Provider store={store}>
      <MuiProvider>
        <BrowserRouter>
          <Switch>
            <Route path='/dashboard' component={Dashboard} />

            <Route
              path='/'
              render={(props) => (
                <Home
                  {...props}
                  routes={[
                    { label: "Sign In", path: "/signin" },
                    { label: "Sign Up", path: "/signup" },
                  ]}
                  defaultRoute='/signin'
                >
                  <Route
                    path='/signin'
                    render={(props) => (
                      <Auth componentFor='Signin' {...props} />
                    )}
                  />
                  <Route
                    path='/signup'
                    render={(props) => (
                      <Auth componentFor='Signup' {...props} />
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
