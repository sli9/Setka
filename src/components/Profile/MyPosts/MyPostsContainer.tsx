import React from 'react';
import {AddPostAC, ChangeMessageAC, initialStateTypeofProfile} from "../../../Redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {AppRootStoreType} from "../../../Redux/redux-store";
import {Dispatch} from "redux";

export type mapDispatchToPropsType = {
    ChangeMessage: (text: string) => void
    AddPost: () => void
}

const mapStateToProps = (state: AppRootStoreType): initialStateTypeofProfile => {
    return {
        posts: state.profilePage.posts,
        newLetters: state.profilePage.newLetters
    }
}
const mapDispatchToProps = (dispatch: Dispatch): mapDispatchToPropsType => {
    return {
        ChangeMessage: (text: string) => {
            dispatch(ChangeMessageAC(text))
        },
        AddPost: () => {
            dispatch(AddPostAC())
        }
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer;
