import React from 'react';
import {logout} from "../../Redux/auth-reducer";
import {connect} from "react-redux";
import Header from "./Header";
import {AppRootStoreType} from "../../Redux/redux-store";


class HeaderContainer extends React.Component<mapStateToPropsType & mapDispatchToPropsType> {

    render() {
        return <Header {...this.props}/>
    }
}

export type mapStateToPropsType = ReturnType<typeof mapStateToProps>

const mapStateToProps = (state: AppRootStoreType) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login
    }
}
export type mapDispatchToPropsType = {
    logout: () => void,
}

export default connect(mapStateToProps, {logout})(HeaderContainer)
