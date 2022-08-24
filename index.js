import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import MyApp from "./src/pages/_app";

ReactDOM.render(<MyApp />, document.getElementById("root"));
