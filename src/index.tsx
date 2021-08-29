import React from 'react';
import './index.css';
import ReactDOM from "react-dom";
import App from "./App";
import store from "./Redux/state";

function RenderTree() {
    ReactDOM.render(
        <React.StrictMode>
            <App store={store}/>
        </React.StrictMode>,
        document.getElementById('root')
    );
}

export default RenderTree;

RenderTree();
store.Subscribe(RenderTree)