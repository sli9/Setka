import React from 'react';
import Profile from "./Profile";
import {getUserProfile, initialStateTypeofProfile} from "../../Redux/profile-reducer";
import {connect} from "react-redux";
import {AppRootStoreType} from "../../Redux/redux-store";
import {RouteComponentProps, withRouter} from "react-router-dom";

type PathParamsType = {
    userId: string | undefined
}
type PropsType = RouteComponentProps<PathParamsType> & mapStateToPropsProfileType & mapDispatchType


class ProfileContainer extends React.Component<PropsType> {

    componentDidMount() {
        let userId = this.props.match.params.userId
        if(!userId) {
            userId = '2'
        }
            this.props.getUserProfile(userId)

    }

    render() {
        return <Profile {...this.props} profile={this.props.profile} isAuth={this.props.isAuth}/>
    }
}

type mapStateToPropsProfileType = initialStateTypeofProfile & {isAuth: boolean}
const mapStateToProps = (state: AppRootStoreType): mapStateToPropsProfileType => ({
    newLetters: state.profilePage.newLetters,
    posts: state.profilePage.posts,
    profile: state.profilePage.profile,
    isAuth: state.auth.isAuth,

})
type mapDispatchType = {
    getUserProfile: (userId: string) => void
}

export default connect(mapStateToProps, {getUserProfile})(withRouter(ProfileContainer));
