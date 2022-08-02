import React, {useEffect, useState} from "react";

const ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}

const ChatPage: React.FC = () => {

    return <div>
        <Chat/>
    </div>
}

const Chat: React.FC = () => {

    return <div>
        <Messages/>
        <AddMessageForm/>
    </div>
}
const Messages: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessageType[]>([])

    useEffect(() => {
        ws.addEventListener('message', (e) => {
            setMessages((prevMessages) => [...prevMessages, ...JSON.parse(e.data)])
        })
    }, [])

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

    const sendMessage = () => {
        if (!message) {
            return
        }
        ws.send(message)
        setMessage('')
    }

    return <div>
        <div>
            <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}/>
        </div>

        <button onClick={sendMessage}>
            Send
        </button>
    </div>
}

export default ChatPage