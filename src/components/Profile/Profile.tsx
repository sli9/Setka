import React from 'react';
import classes from './Profile.module.css'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {profileType} from "../../Redux/profile-reducer";

type PropsType = {
    profile: profileType | null
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    saveAva: (ava: File) => void
}

const Profile = (props: PropsType) => {
    return <div className={classes.content}>
        <ProfileInfo
            isOwner={props.isOwner}
            profile={props.profile}
            status={props.status}
            updateStatus={props.updateStatus}
            saveAva={props.saveAva}
        />
        <MyPostsContainer/>
    </div>

}

export default Profile;
