import React from 'react';
import classes from './Profile.module.css'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {profileType} from "../../Redux/profile-reducer";
import {Redirect} from "react-router-dom";

type PropsType = {
    profile: profileType | null,
    isAuth: boolean
}

const Profile = (props: PropsType) => {
    if (!props.isAuth) return <Redirect to={'/login'}/>
    return <div className={classes.content}>
        <ProfileInfo profile={props.profile}/>
        <MyPostsContainer/>
    </div>

}

export default Profile;
