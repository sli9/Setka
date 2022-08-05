import {FormAction} from "redux-form";
import {ChatApi, ChatMessageType, StatusType} from "../api/chat-api";
import {Dispatch} from "redux";
import {BaseThunkType} from "./redux-store";


const initialState = {
    messages: [] as ChatMessageType[],
    status: 'pending' as StatusType
}

export type initialStateAuthType = typeof initialState

export type actionsTypes = ReturnType<typeof actions.messagesReceived> | FormAction

//actions
export const actions = {
    messagesReceived: (messages: ChatMessageType[]) => ({
        type: 'chat/MESSAGES-RECEIVED', payload: {messages}
    }),
    statusChanged: (status: StatusType) => ({
        type: 'chat/STATUS-CHANGED', payload: {status}
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
let _statusChangedHandler: ((status: StatusType) => void) | null = null

const statusChangedHandlerCreator = (dispatch: Dispatch) => {
    if (_statusChangedHandler === null) {
        _statusChangedHandler = (status) => {
            dispatch(actions.statusChanged(status))
        }
    }

    return _statusChangedHandler
}

export const startMessagesListening = (): BaseThunkType => async (dispatch) => {
    ChatApi.start()
    ChatApi.subscribe('messages-received', newMessageHandlerCreator(dispatch))
    ChatApi.subscribe('status-changed', statusChangedHandlerCreator(dispatch))
}
export const stopMessagesListening = (): BaseThunkType<actionsTypes> => async (dispatch) => {
    ChatApi.stop()
    ChatApi.unsubscribe('messages-received', newMessageHandlerCreator(dispatch))
    ChatApi.subscribe('status-changed', statusChangedHandlerCreator(dispatch))
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
        case 'chat/STATUS-CHANGED':
            return {
                ...state,
                status: action.payload.status,
            }
        default:
            return state
    }
}
export default ChatReducer