let subscribers = [] as SubscriberType[]

let wschannel: WebSocket | null = null

const closeHandler = () => {
    setTimeout(createChannel, 3300)
}
const messageHandler = (e: MessageEvent) => {
    const newMessage = JSON.parse(e.data)
    subscribers.forEach(s => s(newMessage))
}
function createChannel() {
    wschannel?.removeEventListener('close', closeHandler)
    wschannel?.close()
    wschannel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    wschannel.addEventListener('close', closeHandler)
    wschannel.addEventListener('message', messageHandler)
}



export const ChatApi = {
    start() {
        createChannel()
    },
    stop() {
        // subscribers = []
        wschannel?.removeEventListener('close', closeHandler)
        wschannel?.removeEventListener('message', messageHandler)
        wschannel?.close()
    },
    subscribe(callbak: SubscriberType) {
        subscribers.push(callbak)

        return () => {
            subscribers = subscribers.filter(s => s !== callbak)
        }
    },

    unsubscribe(callback: SubscriberType) {
        subscribers = subscribers.filter(s => s !== callback)
    },

    sendMessage(message: string) {
        wschannel?.send(message)
    }
}

type SubscriberType = (messages: ChatMessageType[]) => void

export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}