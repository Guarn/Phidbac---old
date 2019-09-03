import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import Store from "./composants/data/store";
import { BreakpointProvider } from "react-socks";

ReactDOM.render(
    <BreakpointProvider>
        <Provider store={Store}>
            <App />
        </Provider>
    </BreakpointProvider>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
