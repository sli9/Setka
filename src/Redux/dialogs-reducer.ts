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

export type actionsTypes = ReturnType<typeof AddMessageTextAC>

export const AddMessageTextAC = (newMessage: string) => {
    return {
        type: 'dialogs/ADD-MESSAGE-TEXT',
        newMessage,

    } as const
}

const DialogsReducer = (state: initialStateTypeofDialogs = initialState, action: actionsTypes): initialStateTypeofDialogs => {

    switch (action.type) {
        case "dialogs/ADD-MESSAGE-TEXT":
            const NewMessage = {
                id: '6',
                message: action.newMessage,
            }
            return {
                ...state,
                messages: [...state.messages, NewMessage],
            }
        default:
            return state
    }
}
export default DialogsReducer