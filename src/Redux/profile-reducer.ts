import {Dispatch} from "redux";
import {usersApi} from "../api/api";

const initialState: initialStateTypeofProfile = {
    newLetters: '',
    posts: [
        {message: 'Hi, how are you?', like: 5},
        {message: 'It\'s my first post', like: 2}
    ],
    profile: null,
}
export type initialStateTypeofProfile = {
    newLetters: string
    posts: Array<postType>
    profile: profileType | null
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
type actionsTypes = ReturnType<typeof AddPost> |
    ReturnType<typeof ChangeMessage> | ReturnType<typeof setUserProfile>

export const AddPost = () => {
    return {
        type: 'ADD-POST'
    } as const
}
export const setUserProfile = (profile: profileType) => {
    return {
        type: 'SET-USER-PROFILE',
        profile
    } as const
}

export const getUserProfile = (userId: string) => (dispatch: Dispatch) => {
    usersApi.getProfile(userId).then(data => {
        dispatch(setUserProfile(data))
    })
}
export const ChangeMessage = (letter: string) => {
    return {
        type: 'CHANGE-MESSAGE',
        letter: letter
    } as const
}
const ProfileReducer = (state: initialStateTypeofProfile = initialState, action: actionsTypes): initialStateTypeofProfile => {
    switch (action.type) {
        case "ADD-POST":
            const NewPost = {
                message: state.newLetters,
                like: 0
            }
            return {
                ...state,
                posts: [NewPost, ...state.posts],
                newLetters: ''
            }
        case "CHANGE-MESSAGE":
            return {
                ...state,
                newLetters: action.letter
            }
        case "SET-USER-PROFILE":
            return {
                ...state,
                profile: action.profile
            }
        default:
            return state
    }

}
export default ProfileReducer