import {Dispatch} from "redux";
import {profileApi, usersApi} from "../api/api";

const initialState: initialStateTypeofProfile = {
    posts: [
        {message: 'Hi, how are you?', like: 5},
        {message: 'It\'s my first post', like: 2}
    ],
    profile: null,
    status: ''
}
export type initialStateTypeofProfile = {
    posts: Array<postType>
    profile: profileType | null
    status: string
}
export type profileType = {
    userId: number
    aboutMe: string,
    contacts: contactsType
    lookingForAJob: boolean
    lookingForAJobDescription: string | null
    fullName: string
    photos: {
        small: string | null
        large: null | string
    }
}
type contactsType = {
    facebook: null | string
    website: null | string,
    vk: null | string
    twitter: null | string
    instagram: null | string
    youtube: null | string
    github: null | string
    mainLink: null | string
}
export type postType = {
    message: string
    like: number
}
type actionsTypes = ReturnType<typeof AddPost> | ReturnType<typeof setUserProfile>
    | ReturnType<typeof setStatus>

export const AddPost = (newPost: string) => {
    return {
        type: 'profile/ADD-POST',
        newPost,
    } as const
}

export const setUserProfile = (profile: profileType) => {
    return {
        type: 'profile/SET-USER-PROFILE',
        profile
    } as const
}
export const getUserProfile = (userId: string) => async (dispatch: Dispatch) => {
    const data = await usersApi.getProfile(userId)
        dispatch(setUserProfile(data))
}

export const setStatus = (status: string) => {
    return {
        type: 'profile/SET-USER-STATUS',
        status
    } as const
}
export const getUserStatus = (userId: string) => async (dispatch: Dispatch) => {
    const response = await profileApi.getStatus(userId)
        dispatch(setStatus(response.data))
}
export const updateUserStatus = (status: string) => async (dispatch: Dispatch) => {
    const response = await profileApi.updateStatus(status)
        if (response.data.resultCode === 0) {
            dispatch(setStatus(status))
        }
}


const ProfileReducer = (state: initialStateTypeofProfile = initialState, action: actionsTypes): initialStateTypeofProfile => {
    switch (action.type) {
        case "profile/ADD-POST":
            const NewPost = {
                message: action.newPost,
                like: 0
            }
            return {
                ...state,
                posts: [NewPost, ...state.posts],
            }
        case "profile/SET-USER-PROFILE":
            return {
                ...state,
                profile: action.profile
            }
        case "profile/SET-USER-STATUS":
            return {
                ...state,
                status: action.status
            }
        default:
            return state
    }

}
export default ProfileReducer