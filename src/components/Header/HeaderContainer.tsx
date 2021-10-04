import React from 'react';
import {SetAuthUserData} from "../../Redux/auth-reducer";
import {connect} from "react-redux";
import Header from "./Header";
import {AppRootStoreType} from "../../Redux/redux-store";
import axios from "axios";


class HeaderContainer extends React.Component<mapStateToPropsType & mapDispatchToPropsType> {

    componentDidMount() {
        // this.props.toggleFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`,
            {withCredentials: true}).then(response => {
            if (response.data.resultCode === 0) {
                let {id, email, login} = response.data.data
                this.props.SetAuthUserData(id, email, login)
            }
        })
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
    SetAuthUserData: (id: number, email: string, login: string) => void
}

export default connect(mapStateToProps, {SetAuthUserData})(HeaderContainer)
