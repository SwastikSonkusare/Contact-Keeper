import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import { ToastProvider } from "react-toast-notifications";
import thunk from "redux-thunk";
import reducers from "./reducers";

import App from "./App";
import "./index.scss";

const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <ToastProvider>
      <App />
    </ToastProvider>
  </Provider>,
  document.querySelector("#root")
);
