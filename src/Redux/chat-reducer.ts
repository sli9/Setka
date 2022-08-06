import {ChatApi, ChatMessageAPIType, StatusType} from "../api/chat-api";
import {Dispatch} from "redux";
import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {v1} from 'uuid';
import {FormAction} from "redux-form";

type ChatMessageType = ChatMessageAPIType & { id: string }
const initialState = {
    messages: [] as ChatMessageType[],
    status: 'pending' as StatusType
}

export type initialStateChatType = typeof initialState

export type actionsTypes = InferActionsTypes<typeof actions> | FormAction
//actions
export const actions = {
    messagesReceived: (messages: ChatMessageAPIType[]) => ({
        type: 'chat/MESSAGES-RECEIVED', payload: {messages}
    }),
    statusChanged: (status: StatusType) => ({
        type: 'chat/STATUS-CHANGED', payload: {status}
    })
}

//thunks
let _newMessageHandler: ((messages: ChatMessageAPIType[]) => void) | null = null

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

export const startMessagesListening = (): BaseThunkType<actionsTypes> => async (dispatch) => {
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
const ChatReducer = (state: initialStateChatType = initialState, action: actionsTypes): initialStateChatType => {

    switch (action.type) {
        case 'chat/MESSAGES-RECEIVED':
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages.map((m: ChatMessageAPIType) => ({
                    ...m,
                    id: v1()
                }))].filter((m, index, array) => index >= array.length - 100),
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

