import React from 'react';
import './index.css';
import ReactDOM from "react-dom";
import App from "./App";
import store from "./Redux/redux-store";
import {BrowserRouter} from "react-router-dom";
import {Provider} from './StoreContext';


function RenderTree() {
    ReactDOM.render(
        <React.StrictMode>
            <Provider store={store}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Provider>
        </React.StrictMode>,
        document.getElementById('root')
    );
 }

export default RenderTree;

RenderTree();
store.subscribe(() => RenderTree())