import React from 'react';
import classes from './Profile.module.css'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {storeType} from "../../Redux/state";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

type ProfileType = {
    store: storeType
}

const Profile = (props: ProfileType) => {
    return <div className={classes.content}>
        <ProfileInfo/>
        <MyPostsContainer store={props.store}/>
    </div>

}

export default Profile;
