import {Dispatch} from "redux";
import {profileApi, usersApi} from "../api/api";

const initialState: initialStateTypeofProfile = {
    posts: [
        {id: 1, message: 'Hi, how are you?', like: 5},
        {id: 2, message: 'It\'s my first post', like: 2}
    ],
    profile: {userId: 1,
        aboutMe: '',
        contacts: {
            facebook: null,
            website: null ,
            vk: null,
            twitter: null,
            instagram: null,
            youtube: null,
            github: null,
            mainLink: null,
        },
        lookingForAJob: false,
        lookingForAJobDescription: null,
        fullName: '',
        photos: {
            small: null,
            large: null
        }},
    status: ''
}
let idNumber = 2;

export type initialStateTypeofProfile = {
    posts: Array<postType>
    profile: profileType
    status: string
}
export type profileType = {
    userId: number
    aboutMe: string
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
    id: number
    message: string
    like: number
}
type actionsTypes =
    | ReturnType<typeof AddPost>
    | ReturnType<typeof setUserProfile>
    | ReturnType<typeof setStatus>
    | ReturnType<typeof DeletePost>
    | ReturnType<typeof setOwnerPhoto>

export const AddPost = (newPost: string) => {
    idNumber = idNumber + 1
    return {
        type: 'profile/ADD-POST',
        newPost,
    } as const
}
export const DeletePost = (postId: number) => {
    return {
        type: 'profile/DELETE-POST',
        postId,
    } as const
}
export const setUserProfile = (profile: profileType) => {
    return {
        type: 'profile/SET-USER-PROFILE',
        profile
    } as const
}
export const setStatus = (status: string) => {
    return {
        type: 'profile/SET-USER-STATUS',
        status
    } as const
}
const setOwnerPhoto = (photos: {small: string | null, large: null | string }) => {
    return {
        type: 'profile/SET-OWNER-PHOTO',
        photos
    } as const
}

//thunks
export const saveAva = (ava: File) => async (dispatch: Dispatch) => {
    const response = await profileApi.saveAva(ava)
    if (response.data.resultCode === 0) {
        dispatch(setOwnerPhoto(response.data.photos))
    }
}

export const getUserProfile = (userId: string) => async (dispatch: Dispatch) => {
    const data = await usersApi.getProfile(userId)
    dispatch(setUserProfile(data))
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
                id: idNumber,
                message: action.newPost,
                like: 0
            }
            return {
                ...state,
                posts: [NewPost, ...state.posts],
            }
        case "profile/DELETE-POST":
            return {
                ...state,
                posts: state.posts.filter(post => post.id !== action.postId),
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
            case "profile/SET-OWNER-PHOTO":
            return {
                ...state,
                profile: {...state.profile, photos: action.photos}
            }
        default:
            return state
    }

}
export default ProfileReducer