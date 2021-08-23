let RenderTree = () => {
    console.log('State changed')
}

export type postType = {
    message: string
    like: number
}
export type dialogType = {
    id: string
    name: string
}
export type messageType = {
    id: string
    message: string
}
export type profilePageType = {
    newLetters: string
    posts: Array<postType>
}
export type dialogsPageType = {
    dialogs: Array<dialogType>
    messages: Array<messageType>
}


export type rootStateType = {
    profilePage: profilePageType
    dialogsPage: dialogsPageType
}

export const AddPost = () => {
    const NewPost = {
        message: state.profilePage.newLetters,
        like: 0
    }
    state.profilePage.posts.unshift(NewPost)
    RenderTree()
    state.profilePage.newLetters = ''
}

export const ChangeMessage = (letter: string) => {
    state.profilePage.newLetters = letter
    RenderTree()
}

export const Subscribe = (observer: ()=>void) => {
    RenderTree = observer
}


let state: rootStateType = {
    profilePage: {
        newLetters: '',
        posts: [
            {message: 'Hi, how are you?', like: 5},
            {message: 'It\'s my first post', like: 2}
        ]
    },
    dialogsPage: {
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
        ]
    }
}
export default state