import React from 'react';
import './index.css';
import ReactDOM from "react-dom";
import App from "./App";
import store, {rootStateType} from "./Redux/state";


function RenderTree(state: rootStateType) {
    ReactDOM.render(
        <React.StrictMode>

            <App store={store}/>

        </React.StrictMode>,
        document.getElementById('root')
    );
}

export default RenderTree;

RenderTree(store.getState());
store.subscribe(() => RenderTree(store.getState()))