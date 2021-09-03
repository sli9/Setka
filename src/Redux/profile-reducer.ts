import {actionsTypes, profilePageType} from "./state";

const initialState = {
        newLetters: '',
        posts: [
            {message: 'Hi, how are you?', like: 5},
            {message: 'It\'s my first post', like: 2}
        ]
    }

export const AddPostAC = () => {
    return {
        type: 'ADD-POST'
    } as const
}
export const ChangeMessageAC = (letter: string) => {
    return {
        type: 'CHANGE-MESSAGE',
        letter: letter
    } as const
}
const ProfileReducer = (state: profilePageType = initialState, action: actionsTypes) => {

    switch (action.type) {
        case "ADD-POST":
            const NewPost = {
                message: state.newLetters,
                like: 0
            }
            state.posts.unshift(NewPost)
            state.newLetters = ''
            return state;
        case "CHANGE-MESSAGE":
            state.newLetters = action.letter
            return state;
        default:
            return state
    }

}
export default ProfileReducer