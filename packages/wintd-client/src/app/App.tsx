import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import MuiProvider from "./Mui.provider";

import { Provider } from "react-redux";
import store from "./store";
import Home from "../features/home";
import Auth from "../features/auth/Auth";

function App() {
  return (
    <Provider store={store}>
      <MuiProvider>
        <BrowserRouter>
          <Route
            path='/'
            render={(props) => (
              <Home
                {...props}
                routes={[
                  { label: "Sign In", path: "/signin" },
                  { label: "Sing Up", path: "/signup" },
                ]}
                defaultRoute='/signin'
              >
                <Route
                  path='/signin'
                  render={(props) => <Auth componentFor='Signin' {...props} />}
                />
                <Route
                  path='/signup'
                  render={(props) => <Auth componentFor='Signup' {...props} />}
                />
              </Home>
            )}
          />
        </BrowserRouter>
      </MuiProvider>
    </Provider>
  );
}

export default App;
