import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { StateProvider } from "./store/StateProvider";
import { initialState, reducer } from "./store/reducer";

import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
