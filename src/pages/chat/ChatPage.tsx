import React, {useEffect, useState} from "react";


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

    const [ws, setWs] = useState<WebSocket | null>(null)

    useEffect(() => {
        let wschannel: WebSocket
        const closeHandler = () => {
            setTimeout(createChannel, 3300)
        }

        function createChannel() {
            wschannel?.removeEventListener('close', closeHandler)
            wschannel?.close()
            wschannel = (new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx'))
            wschannel.addEventListener('close', closeHandler)
            setWs(wschannel)
        }
        createChannel()
            }, [])


    return <div>
        <Messages ws={ws}/>
        <AddMessageForm ws={ws}/>
    </div>
}
const Messages: React.FC<{ ws: WebSocket | null }> = ({ws}) => {
    const [messages, setMessages] = useState<ChatMessageType[]>([])

    useEffect(() => {
        const messageHandler = (e: MessageEvent) => {
            setMessages((prevMessages) => [...prevMessages, ...JSON.parse(e.data)])
        };
        ws?.addEventListener('message', messageHandler)
        return () => {ws?.removeEventListener('message', messageHandler)}
    }, [ws])

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
const AddMessageForm: React.FC<{ ws: WebSocket | null }> = ({ws}) => {

    const [message, setMessage] = useState('')
    const [readyChannel, setReadyChannel] = useState<'pending' | 'open'>('pending')

    useEffect(() => {
        const openHandler = () => {
            setReadyChannel('open')
        };
        ws?.addEventListener('open', openHandler)

        return () => {ws?.removeEventListener('open', openHandler)}
    }, [ws])

    const sendMessage = () => {
        if (!message) {
            return
        }
        ws?.send(message)
        setMessage('')
    }

    return <div>
        <div>
            <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}/>
        </div>

        <button disabled={ws === null || readyChannel !== 'open'} onClick={sendMessage}>
            Send
        </button>
    </div>
}

export default ChatPage