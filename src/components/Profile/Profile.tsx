import React from 'react';
import classes from './Profile.module.css'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {profileType} from "../../Redux/profile-reducer";

type PropsType = {
    profile: profileType | null
    status: string
    updateStatus: (status: string) => void
}

const Profile = (props: PropsType) => {
    return <div className={classes.content}>
        <ProfileInfo profile={props.profile} status={props.status} updateStatus={props.updateStatus}/>
        <MyPostsContainer  />
    </div>

}

export default Profile;
