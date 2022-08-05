let subscribers = {
    'messages-received': [] as MessageReceiveSubscriberType[],
    'status-changed': [] as StatusChangedSubscriberType[]
}

let wschannel: WebSocket | null = null

const closeHandler = () => {
    setTimeout(createChannel, 3300)
}
const openHandler = () => {
    notifySubscribersAboutStatus('ready')
}
const errorHandler = () => {
    notifySubscribersAboutStatus('error')
    console.error('REFRESH PAGE')
}
const messageHandler = (e: MessageEvent) => {
    const newMessage = JSON.parse(e.data)
    subscribers["messages-received"].forEach(s => s(newMessage))
}

function cleanUp () {
    wschannel?.removeEventListener('close', closeHandler)
    wschannel?.removeEventListener('message', messageHandler)
    wschannel?.removeEventListener('open', openHandler)
    wschannel?.removeEventListener('error', errorHandler)
}
function notifySubscribersAboutStatus(status: StatusType) {
    subscribers['status-changed'].forEach(s => s(status))
}
function createChannel() {
    cleanUp()
    wschannel?.close()
    wschannel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    notifySubscribersAboutStatus('pending')
    wschannel.addEventListener('close', closeHandler)
    wschannel.addEventListener('message', messageHandler)
    wschannel.addEventListener('open', openHandler)
    wschannel.addEventListener('error', errorHandler)
}

export const ChatApi = {
    start() {
        createChannel()
    },
    stop() {
        subscribers["messages-received"] = []
        subscribers["status-changed"] = []
        cleanUp()
        wschannel?.close()
    },
    subscribe(eventName: EventNameType, callbak: MessageReceiveSubscriberType | StatusChangedSubscriberType) {
        // @ts-ignore
        subscribers[eventName].push(callbak)

        return () => {
            // @ts-ignore
            subscribers[eventName] = subscribers[eventName].filter(s => s !== callbak)
        }
    },

    unsubscribe(eventName: EventNameType, callback: MessageReceiveSubscriberType | StatusChangedSubscriberType) {
        // @ts-ignore
        subscribers = subscribers.filter(s => s !== callback)
    },

    sendMessage(message: string) {
        wschannel?.send(message)
    }
}

type EventNameType = 'messages-received' | 'status-changed'
type MessageReceiveSubscriberType = (messages: ChatMessageType[]) => void
type StatusChangedSubscriberType = (status: StatusType) => void

export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}
export type StatusType = 'pending' | 'ready' | 'error';