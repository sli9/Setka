import React, {ComponentType} from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {Route, withRouter} from "react-router-dom";
import {UsersPage} from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import {Login} from "./components/Login/Login";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./Redux/app-reducer";
import {AppRootStoreType} from "./Redux/redux-store";
import {Preloader} from "./components/common/Preloader";

const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"))
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"))

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
                    <Route path='/dialogs' render={() =>{
                        return <React.Suspense fallback={<Preloader/>}><DialogsContainer/></React.Suspense>
                    } }/>
                    <Route path='/profile/:userId?' render={() => {
                        return <React.Suspense fallback={<Preloader/>}><ProfileContainer/></React.Suspense>
                    }}/>
                    <Route path='/users' render={() => <UsersPage/>}/>
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
