import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import {BrowserRouter, Route} from "react-router-dom";
import {actionsTypes, rootStateType} from "./Redux/state";

type propsType = {
    state: rootStateType
    dispatch: (action: actionsTypes) => void
}

const App: React.FC<propsType> = (props) => {
    return (<BrowserRouter>
            <div className={'app-wrapper'}>
                <Header/>
                <Navbar/>
                <div className={'app-wrapper-content'}>
                    <Route path='/dialogs' render={() => <Dialogs
                        dispatch={props.dispatch}
                        newMessageText={props.state.dialogsPage.newMessageText}
                        dialogs={props.state.dialogsPage.dialogs}
                        messages={props.state.dialogsPage.messages}
                    />}/>
                    <Route path='/profile' render={() => <Profile
                        posts={props.state.profilePage.posts}
                        dispatch={props.dispatch}
                        newLetters={props.state.profilePage.newLetters}
                    />}/>

                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
