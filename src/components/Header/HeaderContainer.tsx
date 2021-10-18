import React from 'react';
import {getAuthUserData} from "../../Redux/auth-reducer";
import {connect} from "react-redux";
import Header from "./Header";
import {AppRootStoreType} from "../../Redux/redux-store";


class HeaderContainer extends React.Component<mapStateToPropsType & mapDispatchToPropsType> {

    componentDidMount() {
        // this.props.toggleFetching(true)
      this.props.getAuthUserData()
    }

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
type mapDispatchToPropsType = {
    getAuthUserData: () => void
}

export default connect(mapStateToProps, {getAuthUserData})(HeaderContainer)
