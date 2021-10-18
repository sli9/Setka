const initialState = {
    dialogs: [
        {id: '1', name: 'Dimych'},
        {id: '2', name: 'Andrey'},
        {id: '3', name: 'Rybak'},
        {id: '4', name: 'Tkach'},
        {id: '5', name: 'Pachik'},
    ] as Array<dialogType>,
    messages: [
        {id: '1', message: 'Hi'},
        {id: '2', message: 'How are you?'},
        {id: '3', message: 'What\'s wrong?'},
        {id: '3', message: 'What\'s wrong?'}
    ] as Array<messageType>,
    newMessageText: '',

}
export type dialogType = {
    id: string;
    name: string
}
export type messageType = {
    id: string
    message: string
}
export type initialStateTypeofDialogs = typeof initialState

export type actionsTypes = ReturnType<typeof ChangeMessageTextAC> |
    ReturnType<typeof AddMessageTextAC>

export const ChangeMessageTextAC = (text: string) => {
    return {
        type: 'CHANGE-MESSAGE-TEXT',
        text: text
    } as const
}
export const AddMessageTextAC = () => {
    return {
        type: 'ADD-MESSAGE-TEXT'
    } as const
}

const DialogsReducer = (state: initialStateTypeofDialogs = initialState, action: actionsTypes): initialStateTypeofDialogs => {

    switch (action.type) {
        case "ADD-MESSAGE-TEXT":
            const NewMessage = {
                id: '6',
                message: state.newMessageText,
            }
            return {
                ...state,
                messages:[...state.messages, NewMessage],
                newMessageText: ''
            }
        case "CHANGE-MESSAGE-TEXT":
            state.newMessageText = action.text
            return {
                ...state,
                newMessageText: action.text
            }
        default:
            return state
    }
}
export default DialogsReducer