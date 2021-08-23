import React from 'react';
import './index.css';
import state, {Subscribe} from "./Redux/state";
import ReactDOM from "react-dom";
import App from "./App";
import {AddPost, ChangeMessage, rootStateType} from "./Redux/state";

function RenderTree() {

    ReactDOM.render(
        <React.StrictMode>
            <App state={state} AddPost={AddPost} ChangeMessage={ChangeMessage}/>
        </React.StrictMode>,
        document.getElementById('root')
    );
}

export default RenderTree;

RenderTree();
Subscribe(RenderTree)