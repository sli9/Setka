import React from 'react';
import {storeType} from "../../../Redux/state";
import {AddPostAC, ChangeMessageAC} from "../../../Redux/profile-reducer";
import MyPosts from "./MyPosts";

type PostsContainerType = {
    store: storeType
}

const MyPostsContainer = (props: PostsContainerType) => {

    const AddPost = () => {
        props.store.dispatch(AddPostAC())
    }
    const ChangeHandler = (text: string) => {
        props.store.dispatch(ChangeMessageAC(text))
    }

    return <MyPosts ChangeMessage={ChangeHandler} AddPost={AddPost}
                    posts={props.store.getState().profilePage.posts}
                    newLetters={props.store.getState().profilePage.newLetters}/>

}

export default MyPostsContainer;
