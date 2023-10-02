import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import Store from "./redux/Store.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorBoundary from "./utils/ErrorBoundary.jsx";

export const server = `${import.meta.env.VITE_BACKEND_URI}/api/v1`;

ReactDOM.createRoot(document.getElementById("root")).render(
  <ErrorBoundary>
    <Provider store={Store}>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
        <App />
    </Provider>
  </ErrorBoundary>
);
