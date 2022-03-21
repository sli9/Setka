import React, {FC} from 'react';
import classes from './MyPosts.module.css'
import Post from "./Post/Post";
import PostReduxForm, {PostFormType} from "./PostForm";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStoreType} from "../../../Redux/redux-store";
import {actions} from "../../../Redux/profile-reducer";


const MyPosts: FC = React.memo(() => {

    const posts = useSelector((state: AppRootStoreType) => state.profilePage.posts)

    const dispatch = useDispatch()

    const PostHandler = (values: PostFormType) => {
        dispatch(actions.addPost(values.newPost))
    }

    return <div className={classes.posts}>
        <h4>My posts</h4>
        <PostReduxForm onSubmit={PostHandler}/>
        <div><h3>New post</h3></div>
        <div className={classes.posts}>
            {posts.map((p, i) => <Post key={i} id={p.id} message={p.message} like={p.like}/>)}
        </div>
    </div>

})

export default MyPosts;
