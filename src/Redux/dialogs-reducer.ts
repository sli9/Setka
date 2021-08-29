import {actionsTypes, dialogsPageType} from "./state";

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

const DialogsReducer = (state: dialogsPageType, action: actionsTypes) => {

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