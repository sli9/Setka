const initialState = {
    users: [] as Array<usersType>
}
export type initialStateOfUsersType = typeof initialState

export type usersType = {
    id: string
    photoUrl: string
    followed: boolean
    name: string
    status: string
    location: locationType
}
type locationType = {
    city: string
    country: string
}


type actionsTypes = followType | unfollowType | setUsersType
type followType = ReturnType<typeof followAC>
type unfollowType = ReturnType<typeof unfollowAC>
type setUsersType = ReturnType<typeof setUsersAC>

export const followAC = (userId: string) => {
    return {
        type: 'FOLLOW',
        userId: userId
    } as const
}
export const unfollowAC = (userId: string) => {
    return {
        type: 'UNFOLLOW',
        userId: userId
    } as const
}
export const setUsersAC = (users: Array<usersType>) => {
    return {
        type: 'SET-USERS',
        users
    } as const
}

const UsersReducer = (state = initialState, action: actionsTypes): initialStateOfUsersType => {

    switch (action.type) {
        case 'FOLLOW':
            return {
                ...state,
                users: state.users.map(u => u.id === action.userId ? {...u, followed: true} : u)
            }
        case 'UNFOLLOW':
            return {
                ...state,
                users: state.users.map(u => u.id === action.userId ? {...u, followed: false} : u)
            }
        case 'SET-USERS':
            return {
                ...state, users: action.users
            }

        default:
            return state
    }
}

export default UsersReducer;