import ProfileReducer, {AddPost, DeletePost} from "./profile-reducer";

const state = {
    posts: [
        {id: 1, message: 'Hi, how are you?', like: 5},
        {id: 2, message: 'It\'s my first post', like: 2}
    ],
    profile: null,
    status: ''
}

test('new post addition', () => {
    const action = AddPost('New post testing')
    const newState = ProfileReducer(state, action)

    expect(newState.posts.length).toBe(3)
    expect(newState.posts[0].message).toBe('New post testing')
    expect(newState.posts[0].id).toBe(3)
});

test('post remove', () => {
    const action = DeletePost(1)
    const newState = ProfileReducer(state, action)

    expect(newState.posts.length).toBe(1)
});



