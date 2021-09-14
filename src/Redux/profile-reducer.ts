const initialState: initialStateTypeofProfile = {
    newLetters: '',
    posts: [
        {message: 'Hi, how are you?', like: 5},
        {message: 'It\'s my first post', like: 2}
    ]
}
export type initialStateTypeofProfile = {
    newLetters: string
    posts: Array<postType>
}
export type postType = {
    message: string
    like: number
}
type actionsTypes = ReturnType<typeof AddPostAC> |
    ReturnType<typeof ChangeMessageAC>

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
const ProfileReducer = (state: initialStateTypeofProfile = initialState, action: actionsTypes): initialStateTypeofProfile => {
    switch (action.type) {
        case "ADD-POST":
            const NewPost = {
                message: state.newLetters,
                like: 0
            }
            return {
                ...state,
                posts: [...state.posts, NewPost]
            }
        case "CHANGE-MESSAGE":
            return {
                ...state,
                newLetters: action.letter
            }
        default:
            return state
    }

}
export default ProfileReducer