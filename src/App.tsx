import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import {BrowserRouter, Route} from "react-router-dom";
import {storeType} from "./Redux/state";

type propsType = {
    store: storeType
}

const App: React.FC<propsType> = (props) => {
    const state = props.store.getState()
    return (<BrowserRouter>
            <div className={'app-wrapper'}>
                <Header/>
                <Navbar/>
                <div className={'app-wrapper-content'}>
                    <Route path='/dialogs' render={() => <Dialogs
                        dispatch={props.store.dispatch.bind(props.store)}
                        newMessageText={state.dialogsPage.newMessageText}
                        dialogs={state.dialogsPage.dialogs}
                        messages={state.dialogsPage.messages}
                    />}/>
                    <Route path='/profile' render={() => <Profile
                        posts={state.profilePage.posts}
                        dispatch={props.store.dispatch.bind(props.store)}
                        newLetters={state.profilePage.newLetters}
                    />}/>

                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
