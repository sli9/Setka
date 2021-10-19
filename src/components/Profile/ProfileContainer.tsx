import React from 'react';
import Profile from "./Profile";
import {getUserProfile, initialStateTypeofProfile} from "../../Redux/profile-reducer";
import {connect} from "react-redux";
import {AppRootStoreType} from "../../Redux/redux-store";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

type PathParamsType = {
    userId: string | undefined
}
type PropsType = RouteComponentProps<PathParamsType> & initialStateTypeofProfile & mapDispatchType


class ProfileContainer extends React.Component<PropsType> {

    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = '2'
        }
        this.props.getUserProfile(userId)

    }

    render() {
        return <Profile {...this.props} profile={this.props.profile}/>
    }
}

const mapStateToProps = (state: AppRootStoreType): initialStateTypeofProfile => ({
    newLetters: state.profilePage.newLetters,
    posts: state.profilePage.posts,
    profile: state.profilePage.profile,
})
type mapDispatchType = {
    getUserProfile: (userId: string) => void
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfile}),
    withRouter,
    withAuthRedirect)(ProfileContainer)
