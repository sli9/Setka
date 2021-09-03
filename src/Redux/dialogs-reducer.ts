import {actionsTypes, dialogsPageType} from "./state";

const initialState = {
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

const DialogsReducer = (state: dialogsPageType = initialState, action: actionsTypes) => {

    switch (action.type) {
        case "ADD-MESSAGE-TEXT":
            const NewMessage = {
                id: '6',
                message: state.newMessageText,
            }
           state.messages.push(NewMessage)
            state.newMessageText = ''
            return state;
        case "CHANGE-MESSAGE-TEXT":
            state.newMessageText = action.text
            return state
        default:
            return state
    }
}
export default DialogsReducer