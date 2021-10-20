import React from 'react';
import Profile from "./Profile";
import {getUserProfile, getUserStatus, initialStateTypeofProfile, updateUserStatus} from "../../Redux/profile-reducer";
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
            userId = '19639'
        }
        this.props.getUserProfile(userId)
        this.props.getUserStatus(userId)
    }

    render() {
        return <Profile {...this.props}
                        profile={this.props.profile}
                        status={this.props.status}
                        updateStatus={this.props.updateUserStatus}
        />
    }
}

const mapStateToProps = (state: AppRootStoreType): initialStateTypeofProfile => ({
    newLetters: state.profilePage.newLetters,
    posts: state.profilePage.posts,
    profile: state.profilePage.profile,
    status: state.profilePage.status
})
type mapDispatchType = {
    getUserProfile: (userId: string) => void
    getUserStatus: (userId: string) => void
    updateUserStatus: (status: string) => void
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfile, getUserStatus, updateUserStatus}),
    withRouter,
    withAuthRedirect)(ProfileContainer)


