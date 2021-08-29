import React from 'react';
import classes from './Profile.module.css'
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {actionsTypes, postType} from "../../Redux/state";

type ProfileType = {
    posts: Array<postType>
    newLetters: string
    dispatch: (action: actionsTypes) => void
}

const Profile = (props: ProfileType) => {
    return <div className={classes.content}>
        <ProfileInfo/>
        <MyPosts posts={props.posts}
                 dispatch={props.dispatch}
                 newLetters={props.newLetters}
        />
    </div>

}

export default Profile;
