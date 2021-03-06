import ProfileReducer, {actions, initialStateTypeofProfile} from "./profile-reducer";

const state: initialStateTypeofProfile = {
    posts: [
        {id: 1, message: 'Hi, how are you?', like: 5},
        {id: 2, message: 'It\'s my first post', like: 2}
    ],
    profile: {
        userId: 1,
        aboutMe: '',
        contacts: {
            facebook: '',
            website: '',
            vk: '',
            twitter: '',
            instagram: '',
            youtube: '',
            github: '',
            mainLink: '',
        },
        lookingForAJob: false,
        lookingForAJobDescription: '',
        fullName: '',
        photos: {
            small: null,
            large: null
        }
    },
    status: ''
}

test('new post addition', () => {
    const action = actions.addPost('New post testing')
    const newState = ProfileReducer(state, action)

    expect(newState.posts.length).toBe(3)
    expect(newState.posts[0].message).toBe('New post testing')
    expect(newState.posts[0].id).toBe(3)
});

test('post remove', () => {
    const action = actions.DeletePost(1)
    const newState = ProfileReducer(state, action)

    expect(newState.posts.length).toBe(1)
});



