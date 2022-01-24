import {actions, postType, profileType} from "../../../Redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {AppRootStoreType} from "../../../Redux/redux-store";
import {Dispatch} from "redux";

export type mapDispatchToPropsType = {
    AddPost: (values: string) => void
}
const mapDispatchToProps = (dispath: Dispatch) => {
    return{
        AddPost: (values: string) => {dispath(actions.addPost(values))}
    }
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

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer;
