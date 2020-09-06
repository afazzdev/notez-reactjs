import React from "react";
import MuiProvider from "./Mui.provider";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <MuiProvider>
        <div className='App'>Starter</div>
      </MuiProvider>
    </Provider>
  );
}

export default App;
