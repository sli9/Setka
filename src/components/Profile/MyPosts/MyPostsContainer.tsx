import React from 'react';
import {AddPostAC, ChangeMessageAC} from "../../../Redux/profile-reducer";
import MyPosts from "./MyPosts";
import StoreContext from '../../../StoreContext';


const MyPostsContainer = () => {

    return <StoreContext.Consumer>
        {
        (store) => {
            const AddPost = () => {
                store.dispatch(AddPostAC())
            }
            const ChangeHandler = (text: string) => {
                store.dispatch(ChangeMessageAC(text))
            }
            return <MyPosts ChangeMessage={ChangeHandler} AddPost={AddPost}
                            posts={store.getState().profilePage.posts}
                            newLetters={store.getState().profilePage.newLetters}/>
        }
    }
    </StoreContext.Consumer>
}

export default MyPostsContainer;
