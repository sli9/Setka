import {AddPost, ChangeMessage, postType, profileType} from "../../../Redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {AppRootStoreType} from "../../../Redux/redux-store";

export type mapDispatchToPropsType = {
    ChangeMessage: (text: string) => void
    AddPost: () => void
}
export type mapStateToPropsType = {
    posts: Array<postType>
    newLetters: string
    profile: profileType | null
}

const mapStateToProps = (state: AppRootStoreType): mapStateToPropsType => {
    return {
        posts: state.profilePage.posts,
        newLetters: state.profilePage.newLetters,
        profile: state.profilePage.profile
    }
}

const MyPostsContainer = connect(mapStateToProps, {ChangeMessage, AddPost})(MyPosts)

export default MyPostsContainer;
