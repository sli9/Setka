import {AddPost, postType, profileType} from "../../../Redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {AppRootStoreType} from "../../../Redux/redux-store";

export type mapDispatchToPropsType = {
    AddPost: (values: string) => void
}
export type mapStateToPropsType = {
    posts: Array<postType>
    profile: profileType | null
}

const mapStateToProps = (state: AppRootStoreType): mapStateToPropsType => {
    return {
        posts: state.profilePage.posts,
        profile: state.profilePage.profile
    }
}

const MyPostsContainer = connect(mapStateToProps, {AddPost})(MyPosts)

export default MyPostsContainer;
