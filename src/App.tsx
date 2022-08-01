import React, {ComponentType} from 'react';
import './App.css';
import 'antd/dist/antd.css'
import {NavLink, Redirect, Route, Switch, withRouter} from "react-router-dom";
import {UsersPage} from "./components/Users/UsersContainer";
import {Login} from "./components/Login/Login";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./Redux/app-reducer";
import {AppRootStoreType} from "./Redux/redux-store";
import {Preloader} from "./components/common/Preloader";

import {Layout, Menu} from "antd";
import {AlignCenterOutlined, UsergroupAddOutlined, UserOutlined} from '@ant-design/icons';
import HeaderContainer from "./components/Header/HeaderContainer";

const {Header, Content, Sider} = Layout;

const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"))
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"))

class App extends React.Component<mapStatePropsType & mapDispatchPropsType> {

    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        if (!this.props.initialized) <Preloader/>
        return (
            <Layout>
                <Header className="site-layout-sub-header-background" style={{padding: 0}}>
                <HeaderContainer/>
                </Header>
                <Layout>
                    <Sider>

                        <Menu
                            theme="dark"
                            mode="inline"
                            defaultSelectedKeys={['1']}
                        >
                            <Menu.Item key={'1'} icon={<UserOutlined/>}><NavLink
                                to='/profile'>Profile</NavLink></Menu.Item>
                            <Menu.Item key={'2'} icon={<AlignCenterOutlined/>}><NavLink to='/dialogs'>Messages</NavLink></Menu.Item>
                            <Menu.Item key={'3'} icon={<UsergroupAddOutlined/>}><NavLink
                                to='/users'>Users</NavLink></Menu.Item>
                        </Menu>
                    </Sider>
                    <Content style={{margin: '24px 16px 0'}}>
                        <div style={{padding: 24, minHeight: 360, color: "black"}}>
                            <Switch>
                                <Route exact path='/' render={() => <Redirect to={'/profile'}/>}/>
                                <Route path='/dialogs' render={() => {
                                    return <React.Suspense fallback={<Preloader/>}><DialogsContainer/></React.Suspense>
                                }}/>
                                <Route path='/profile/:userId?' render={() => {
                                    return <React.Suspense fallback={<Preloader/>}><ProfileContainer/></React.Suspense>
                                }}/>
                                <Route path='/users' render={() => <UsersPage/>}/>
                                <Route path='/login' render={() => <Login/>}/>
                                <Route path='*' render={() => <div>NOT FOUND 404</div>}/>
                            </Switch>
                        </div>
                    </Content>
                </Layout>
            </Layout>

            // <div className={'app-wrapper'}>
            //     <HeaderContainer/>
            //     <Navbar/>
            //     <div className={'app-wrapper-content'}>
            //         <Switch>
            //             <Route exact path='/' render={() => <Redirect to={'/profile'}/>}/>
            //             <Route path='/dialogs' render={() => {
            //                 return <React.Suspense fallback={<Preloader/>}><DialogsContainer/></React.Suspense>
            //             }}/>
            //             <Route path='/profile/:userId?' render={() => {
            //                 return <React.Suspense fallback={<Preloader/>}><ProfileContainer/></React.Suspense>
            //             }}/>
            //             <Route path='/users' render={() => <UsersPage/>}/>
            //             <Route path='/login' render={() => <Login/>}/>
            //             <Route path='*' render={() => <div>NOT FOUND 404</div>}/>
            //         </Switch>
            //     </div>
            // </div>
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
