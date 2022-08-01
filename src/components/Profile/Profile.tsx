import React from 'react';
import classes from './Profile.module.css'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {MyPosts} from "./MyPosts/MyPosts";


type PropsType = {
    isOwner: boolean
}

const Profile = (props: PropsType) => {


    return <div className={classes.content}>
        <ProfileInfo isOwner={props.isOwner} />
        <MyPosts />
    </div>

}

export default Profile;
