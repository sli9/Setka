import {FormAction} from "redux-form";
import {ChatApi, ChatMessageType} from "../api/chat-api";
import {Dispatch} from "redux";
import {BaseThunkType} from "./redux-store";

const initialState = {
    messages: [] as ChatMessageType[],
}

export type initialStateAuthType = typeof initialState

export type actionsTypes = ReturnType<typeof actions.messagesReceived> | FormAction

//actions
export const actions = {
    messagesReceived: (messages: ChatMessageType[]) => ({
        type: 'chat/MESSAGES-RECEIVED', payload: {messages}
    })
}

//thunks
let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null

const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(actions.messagesReceived(messages))
        }
    }

    return _newMessageHandler
}

export const startMessagesListening = (): BaseThunkType => async (dispatch) => {
    ChatApi.start()
    ChatApi.subscribe(newMessageHandlerCreator(dispatch))
}
export const stopMessagesListening = (): BaseThunkType<actionsTypes> => async (dispatch) => {
    ChatApi.stop()
    ChatApi.unsubscribe(newMessageHandlerCreator(dispatch))
}
export const sendMessage = (message: string): BaseThunkType<actionsTypes> => async (dispatch) => {
    ChatApi.sendMessage(message)
}

//reducer
const ChatReducer = (state: initialStateAuthType = initialState, action: actionsTypes): initialStateAuthType => {

    switch (action.type) {
        case 'chat/MESSAGES-RECEIVED':
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages],
            }
        default:
            return state
    }
}
export default ChatReducer