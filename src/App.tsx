import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import {BrowserRouter, Route} from "react-router-dom";
import {rootStateType} from "./Redux/state";

type stateType = {
    state: rootStateType
    AddPost: () => void
    ChangeMessage: (letter: string) => void
}

function App(props: stateType) {
    return (<BrowserRouter>
            <div className={'app-wrapper'}>
                <Header/>
                <Navbar/>
                <div className={'app-wrapper-content'}>
                    <Route path='/dialogs' render={() => <Dialogs
                        dialogs={props.state.dialogsPage.dialogs}
                        messages={props.state.dialogsPage.messages}
                    />}/>
                    <Route path='/profile' render={() => <Profile
                        posts={props.state.profilePage.posts}
                        AddPost={props.AddPost}
                        newLetters={props.state.profilePage.newLetters}
                        ChangeMessage={props.ChangeMessage}
                    />}/>

                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
