import {AddPost, ChangeMessage, initialStateTypeofProfile} from "../../../Redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {AppRootStoreType} from "../../../Redux/redux-store";

export type mapDispatchToPropsType = {
    ChangeMessage: (text: string) => void
    AddPost: () => void
}

const mapStateToProps = (state: AppRootStoreType): initialStateTypeofProfile => {
    return {
        posts: state.profilePage.posts,
        newLetters: state.profilePage.newLetters,
        profile: state.profilePage.profile
    }
}

const MyPostsContainer = connect(mapStateToProps, {ChangeMessage, AddPost})(MyPosts)

export default MyPostsContainer;
