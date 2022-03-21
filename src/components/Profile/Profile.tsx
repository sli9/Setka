import React from 'react';
import classes from './Profile.module.css'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

type PropsType = {
    isOwner: boolean
}

const Profile = (props: PropsType) => {


    return <div className={classes.content}>
        <ProfileInfo isOwner={props.isOwner} />
        <MyPostsContainer />
    </div>

}

export default Profile;
