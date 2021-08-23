import React from 'react';
import classes from './Profile.module.css'
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {postType} from "../../Redux/state";

type ProfileType = {
    posts: Array<postType>
    AddPost: () => void
    newLetters: string
    ChangeMessage: (letter: string) => void
}

const Profile = (props: ProfileType) => {
    return <div className={classes.content}>
        <ProfileInfo/>
        <MyPosts posts={props.posts}
                 AddPost={props.AddPost}
                 newLetters={props.newLetters}
                 ChangeMessage={props.ChangeMessage}/>
    </div>

}

export default Profile;
