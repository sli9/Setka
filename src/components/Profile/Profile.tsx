import React from 'react';
import classes from './Profile.module.css'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {profileType} from "../../Redux/profile-reducer";

type PropsType = {
    profile: profileType | null,
}

const Profile = (props: PropsType) => {
    return <div className={classes.content}>
        <ProfileInfo profile={props.profile}/>
        <MyPostsContainer/>
    </div>

}

export default Profile;
