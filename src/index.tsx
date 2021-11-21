import React from 'react';
import './index.css';
import ReactDOM from "react-dom";
import App from "./App";
import store from "./Redux/redux-store";
import {HashRouter} from "react-router-dom";
import {Provider} from "react-redux";


// function RenderTree() {
    ReactDOM.render(
        <React.StrictMode>
            <HashRouter>
                <Provider store={store}>
                    <App/>
                </Provider>
            </HashRouter>
        </React.StrictMode>,
        document.getElementById('root')
    );
// }

// export default RenderTree;

// RenderTree();
// store.subscribe(() => RenderTree())