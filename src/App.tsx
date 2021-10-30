import React, {ComponentType} from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {Route, withRouter} from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./Redux/app-reducer";
import {AppRootStoreType} from "./Redux/redux-store";
import {Preloader} from "./components/common/Preloader";


class App extends React.Component<mapStatePropsType & mapDispatchPropsType> {

    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        if (!this.props.initialized) <Preloader/>
        return (
            <div className={'app-wrapper'}>
                <HeaderContainer/>
                <Navbar/>
                <div className={'app-wrapper-content'}>
                    <Route path='/dialogs' render={() => <DialogsContainer/>}/>
                    <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                    <Route path='/users' render={() => <UsersContainer/>}/>
                    <Route path='/login' render={() => <Login/>}/>
                </div>
            </div>
        );
    }
}

type mapStatePropsType = {
    initialized: boolean
}

const mapStateToProps = (state: AppRootStoreType) => {
    return {
        initialized: state.app.initialized
    }
}

type mapDispatchPropsType = {
    initializeApp: () => void,
}

export default compose<ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeApp})
)(App);
