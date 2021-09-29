import React from 'react';
import Profile from "./Profile";
import {initialStateTypeofProfile, profileType, setUserProfile} from "../../Redux/profile-reducer";
import axios from "axios";
import {connect} from "react-redux";
import {AppRootStoreType} from "../../Redux/redux-store";
import {RouteComponentProps, withRouter} from "react-router-dom";

type PathParamsType = {
    userId: string | undefined
}
type PropsType = RouteComponentProps<PathParamsType> & initialStateTypeofProfile & mapDispatchType


class ProfileContainer extends React.Component<PropsType> {

    componentDidMount() {
        let userId = this.props.match.params.userId
        if(!userId) {
            userId = '2'
        }
            axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`).then(response => {
                this.props.setUserProfile(response.data)
            })

    }

    render() {
        return <Profile {...this.props} profile={this.props.profile}/>
    }
}

const mapStateToProps = (state: AppRootStoreType): initialStateTypeofProfile => ({
    newLetters: state.profilePage.newLetters,
    posts: state.profilePage.posts,
    profile: state.profilePage.profile

})
type mapDispatchType = {
    setUserProfile: (profile: profileType) => void
}

export default connect(mapStateToProps, {setUserProfile})(withRouter(ProfileContainer));
