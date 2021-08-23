import React, {ChangeEvent} from 'react';
import classes from './MyPosts.module.css'
import Post from "./Post/Post";
import {postType} from "../../../Redux/state";

type PostsType = {
    posts: Array<postType>
    AddPost: () => void
    newLetters: string
    ChangeMessage: (letter: string) => void
}

const MyPosts = (props: PostsType) => {

    const PostHandler = () => {
        props.AddPost()
    }
    const ChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.ChangeMessage(e.currentTarget.value)
    }

    return <div className={classes.posts}>
        <h4>My posts</h4>
        <div>
            <div>
                <textarea value={props.newLetters} onChange={ChangeHandler}></textarea>
            </div>
            <div>
                <button onClick={PostHandler}>Add post</button>
            </div>
        </div>
        <div><h3>New post</h3></div>
        <div className={classes.posts}>
            {props.posts.map(p => <Post message={p.message} like={p.like}/>)}
        </div>
    </div>

}

export default MyPosts;
