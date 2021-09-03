import ProfileReducer, {AddPostAC, ChangeMessageAC} from "./profile-reducer";
import DialogsReducer, {AddMessageTextAC, ChangeMessageTextAC} from "./dialogs-reducer";

export type postType = {
    message: string
    like: number
}
export type dialogType = {
    id: string
    name: string
}
export type messageType = {
    id: string
    message: string
}
export type profilePageType = {
    newLetters: string
    posts: Array<postType>
}
export type dialogsPageType = {
    dialogs: Array<dialogType>
    messages: Array<messageType>
    newMessageText: string
}


export type rootStateType = {
    profilePage: profilePageType
    dialogsPage: dialogsPageType
}
export type storeType = {
    _state: rootStateType
    subscribe: (observer: () => void) => void
    getState: () => rootStateType
    _callSubscriber: () => void
    dispatch: (action: actionsTypes) => void
}

export type actionsTypes = ReturnType<typeof AddPostAC> |
    ReturnType<typeof ChangeMessageAC> |
    ReturnType<typeof ChangeMessageTextAC> |
    ReturnType<typeof AddMessageTextAC>




const store: storeType = {
    _state: {
        profilePage: {
            newLetters: '',
            posts: [
                {message: 'Hi, how are you?', like: 5},
                {message: 'It\'s my first post', like: 2}
            ]
        },
        dialogsPage: {
            dialogs: [
                {id: '1', name: 'Dimych'},
                {id: '2', name: 'Andrey'},
                {id: '3', name: 'Rybak'},
                {id: '4', name: 'Tkach'},
                {id: '5', name: 'Pachik'},
            ],
            messages: [
                {id: '1', message: 'Hi'},
                {id: '2', message: 'How are you?'},
                {id: '3', message: 'What\'s wrong?'},
                {id: '3', message: 'What\'s wrong?'}
            ],
            newMessageText: ''
        }
    },
    _callSubscriber() {
        console.log('State changed')
    },
    subscribe(observer) {
        this._callSubscriber = observer
    },
    getState() {
        return this._state
    },
    dispatch(action) {
        this._state.profilePage = ProfileReducer(this._state.profilePage, action)
        this._state.dialogsPage = DialogsReducer(this._state.dialogsPage, action)
        this._callSubscriber()
    }
}
export default store