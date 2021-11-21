import React from 'react';
import classes from './MyPosts.module.css'
import Post from "./Post/Post";
import {mapDispatchToPropsType, mapStateToPropsType} from "./MyPostsContainer";
import PostReduxForm, {PostFormType} from "./PostForm";

type PostsType = mapStateToPropsType & mapDispatchToPropsType

const MyPosts = React.memo((props: PostsType) => {

    const PostHandler = (values: PostFormType) => {
        props.AddPost(values.newPost)
    }

    return <div className={classes.posts}>
        <h4>My posts</h4>
        <PostReduxForm onSubmit={PostHandler}/>
        <div><h3>New post</h3></div>
        <div className={classes.posts}>
            {props.posts.map((p, i) => <Post key={i} id={p.id} message={p.message} like={p.like}/>)}
        </div>
    </div>

})

export default MyPosts;
