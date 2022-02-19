import {Dispatch} from "redux";
import {ResultCodes} from "../api/api";
import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {FormAction, stopSubmit} from "redux-form";
import {profileApi} from "../api/profile-api";


const initialState: initialStateTypeofProfile = {
    posts: [
        {id: 1, message: 'Hi, how are you?', like: 5},
        {id: 2, message: 'It\'s my first post', like: 2}
    ],
    profile: {
        userId: 1,
        aboutMe: '',
        contacts: {
            facebook: '',
            website: '',
            vk: '',
            twitter: '',
            instagram: '',
            youtube: '',
            github: '',
            mainLink: '',
        },
        lookingForAJob: false,
        lookingForAJobDescription: null,
        fullName: '',
        photos: {
            small: null,
            large: null
        }
    },
    status: '',

}
let idNumber = 2; // for new  posts id

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
export type contactsType = {
    facebook: string
    website: string,
    vk: string
    twitter: string
    instagram: string
    youtube: string
    github: string
    mainLink: string
}
export type postType = {
    id: number
    message: string
    like: number
}

export const actions = {
    addPost: (newPost: string) => {
        idNumber = idNumber + 1
        return {
            type: 'profile/ADD-POST',
            payload: {newPost},
        } as const
    },
    DeletePost: (postId: number) => ({
        type: 'profile/DELETE-POST',
        payload: {postId},
    } as const),
    setUserProfile: (profile: profileType) => ({
        type: 'profile/SET-USER-PROFILE',
        profile
    } as const),
    setStatus: (status: string) => ({
        type: 'profile/SET-USER-STATUS',
        status
    } as const),
    setOwnerPhoto: (photos: { small: string | null, large: null | string }) => ({
        type: 'profile/SET-OWNER-PHOTO',
        photos
    } as const)
}
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>

//thunks
export const saveAva = (ava: File) => async (dispatch: Dispatch) => {
    const response = await profileApi.saveAva(ava)
    if (response.data.resultCode === ResultCodes.success) {
        dispatch(actions.setOwnerPhoto(response.data.data.photos))
    }
}

export const saveProfile = (profile: profileType): ThunkType => async (dispatch,
                                                                       getState) => {
    const userId = JSON.stringify(getState().auth.id)
    const response = await profileApi.saveProfile(profile)
    if (response.data.resultCode === ResultCodes.success) {
        dispatch(getUserProfile(userId))
    } else {
        const error = response.data.messages.length > 0 ? response.data.messages[0] : 'Something wrong'
        dispatch(stopSubmit('edit-profile-form', {_error: error}))
        return Promise.reject(error)
    }
}

export const getUserProfile = (userId: string) => async (dispatch: Dispatch) => {
    const data = await profileApi.getProfile(userId)
    dispatch(actions.setUserProfile(data))
}

export const getUserStatus = (userId: string) => async (dispatch: Dispatch) => {
    const response = await profileApi.getStatus(userId)
    dispatch(actions.setStatus(response.data))
}
export const updateUserStatus = (status: string) => async (dispatch: Dispatch) => {
    const response = await profileApi.updateStatus(status)
    if (response.data.resultCode === ResultCodes.success) {
        dispatch(actions.setStatus(status))
    }
}

//reducer
const ProfileReducer = (state: initialStateTypeofProfile = initialState, action: ActionsType): initialStateTypeofProfile => {
    switch (action.type) {
        case "profile/ADD-POST":

            const NewPost = {
                id: idNumber,
                message: action.payload.newPost,
                like: 0
            }
            return {
                ...state,
                posts: [NewPost, ...state.posts],
            }
        case "profile/DELETE-POST":
            return {
                ...state,
                posts: state.posts.filter(post => post.id !== action.payload.postId),
            }
        case "profile/SET-USER-PROFILE":
            return {
                ...state,
                profile: action.profile,
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