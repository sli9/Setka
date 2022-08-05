import React, {useEffect, useState} from "react";
import {ChatMessageType} from "../../api/chat-api";
import {useDispatch, useSelector} from "react-redux";
import {sendMessage, startMessagesListening, stopMessagesListening} from "../../Redux/chat-reducer";
import {AppRootStoreType} from "../../Redux/redux-store";


const ChatPage: React.FC = () => {

    return <div>
        <Chat/>
    </div>
}

const Chat: React.FC = () => {

    const status = useSelector((state: AppRootStoreType) => state.chat.status)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])


    return <div>
        {status === 'error' ? <div>Some error occurred. Please refresh the page.</div> :
            <>
                <Messages/>
                <AddMessageForm/>
            </>}
    </div>
}
const Messages: React.FC = () => {
    const messages = useSelector((state: AppRootStoreType) => state.chat.messages)

    return <div style={{height: '400px', overflowY: 'auto'}}>
        {messages.map((m, index) => <ChatMessage key={index} message={m}/>)}

    </div>
}
const ChatMessage: React.FC<{ message: ChatMessageType }> = ({message}) => {
    return <div>
        <img src={message.photo} style={{width: '30px'}} alt={'ava'}/> <b>{message.userName}</b>
        <br/>
        {message.message}
        <hr/>
    </div>
}
const AddMessageForm: React.FC = () => {

    const [message, setMessage] = useState('')
    const status = useSelector((state: AppRootStoreType) => state.chat.status)
    const dispatch = useDispatch()

    const sendMessageHandler = () => {
        if (!message) {
            return
        }
        dispatch(sendMessage(message))
        setMessage('')
    }

    return <div>
        <div>
            <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}/>
        </div>

        <button disabled={status !== 'ready'} onClick={sendMessageHandler}>
            Send
        </button>
    </div>
}

export default ChatPage