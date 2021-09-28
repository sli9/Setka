const initialState = {
    users: [] as Array<usersType>,
    pageSize: 100,
    totalUsers: 20,
    currentPage: 1,
    isFetching: false,
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


type actionsTypes = followType | unfollowType | setUsersType | setCurrentPageType | setTotalUsersCountType |
    toggleFetchingType
type followType = ReturnType<typeof follow>
type unfollowType = ReturnType<typeof unfollow>
type setUsersType = ReturnType<typeof setUsers>
type setCurrentPageType = ReturnType<typeof setCurrentPage>
type setTotalUsersCountType = ReturnType<typeof setTotalUsersCount>
type toggleFetchingType = ReturnType<typeof toggleFetching>


export const follow = (userId: number) => {
    return {
        type: 'FOLLOW',
        userId: userId
    } as const
}
export const unfollow = (userId: number) => {
    return {
        type: 'UNFOLLOW',
        userId: userId
    } as const
}
export const setUsers = (users: Array<usersType>) => {
    return {
        type: 'SET-USERS',
        users
    } as const
}
export const setCurrentPage = (currentPage: number) => {
    return {
        type: 'SET-CURRENT-PAGE',
        currentPage
    } as const
}
export const setTotalUsersCount = (totalCount: number) => {
    return {
        type: 'SET-TOTAL-USERS-COUNT',
        totalCount
    } as const
}
export const toggleFetching = (fetching: boolean) => {
    return {
        type: 'TOGGLE-FETCHING',
        fetching
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
        case 'SET-CURRENT-PAGE':
            return {
                ...state, currentPage: action.currentPage
            }
        case 'SET-TOTAL-USERS-COUNT':
            return {
                ...state, totalUsers: action.totalCount
            }
        case 'TOGGLE-FETCHING':
            return {
                ...state, isFetching: action.fetching
            }
        default:
            return state
    }
}

export default UsersReducer;