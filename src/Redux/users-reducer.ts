const initialState = {
    users: [] as Array<usersType>
}
export type initialStateOfUsersType = typeof initialState

    type photoType = {
        small: string | null
        large: string | null
    }

export type usersType = {
    id: number
    photos: photoType
    followed: boolean
    name: string
    status: string | null
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



export const followAC = (userId: number) => {
    return {
        type: 'FOLLOW',
        userId: userId
    } as const
}
export const unfollowAC = (userId: number) => {
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