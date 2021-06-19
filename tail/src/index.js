import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
// Stylesheets
import "./styles/App.css";
import "./styles/index.css";
import "./styles/header.css";
import "./styles/footer.css";
import "./styles/navigation.css";
import "./styles/auth.css";
import "./styles/cover.css";
import "./styles/liabilities.css";
import "./styles/deals.css";
import "./styles/assets.css";
import "./styles/savings.css";
import "./styles/default.css";
import "./styles/nugget.css";
import "./styles/input-fields.css";
import App from "./App";
import store from "./store";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
