import {actions, postType, profileType} from "../../../Redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {AppRootStoreType} from "../../../Redux/redux-store";

export type mapStateToPropsType = {
    posts: Array<postType>
    profile: profileType | null
}
export type mapDispatchToPropsType = {
    AddPost: (newPost: string) => void
}

const mapStateToProps = (state: AppRootStoreType): mapStateToPropsType => {
    return {
        posts: state.profilePage.posts,
        profile: state.profilePage.profile
    }
}

const MyPostsContainer = connect<mapStateToPropsType, mapDispatchToPropsType, {}, AppRootStoreType>(mapStateToProps, {
    AddPost: actions.addPost
})(MyPosts)

export default MyPostsContainer;
