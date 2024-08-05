import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";

const rootElement = document.createElement("div");
document.body.appendChild(rootElement);
ReactDOM.createRoot(rootElement).render(<App />);
