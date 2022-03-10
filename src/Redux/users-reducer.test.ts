import UsersReducer, {actions, initialStateOfUsersType} from "./users-reducer";

let state: initialStateOfUsersType

beforeEach(() => {
    state = {
        users: [
            {
                id: 0, photos: {small: null, large: null}, followed: true,
                name: 'Petro', status: null, location: {city: '', country: ''}
            },
            {
                id: 1, photos: {small: null, large: null}, followed: false,
                name: 'Bazil', status: null, location: {city: '', country: ''}
            },
            {
                id: 2, photos: {small: null, large: null}, followed: true,
                name: 'Vitek', status: null, location: {city: '', country: ''}
            },
            {
                id: 3, photos: {small: null, large: null}, followed: false,
                name: 'Anton', status: null, location: {city: '', country: ''}
            }

        ],
        pageSize: 10,
        totalUsers: 20,
        currentPage: 1,
        isFetching: false,
        followingInProgress: []
    }
})

test('follow is success', () => {
    const newState = UsersReducer(state, actions.followSuccess(1))

    expect(newState.users[1].followed).toBeTruthy()
    expect(newState.users[0].followed).toBeTruthy()
    expect(newState.users[3].followed).toBeFalsy()
})
test('unfollow is success', () => {
    const newState = UsersReducer(state, actions.unFollowSuccess(2))

    expect(newState.users[0].followed).toBeTruthy()
    expect(newState.users[2].followed).toBeFalsy()
    expect(newState.users[3].followed).toBeFalsy()
})
test('set users is success', () => {
    const newState = UsersReducer(state, actions.setUsers([
        {
            id: 4, photos: {small: null, large: null}, followed: false,
            name: 'Check', status: null, location: {city: '', country: ''}
        },
        {
            id: 5, photos: {small: null, large: null}, followed: false,
            name: 'Check2', status: null, location: {city: '', country: ''}
        }
    ]))

    expect(newState.users).toHaveLength(2)
    expect(newState.users[0].name).toBe('Check')
})