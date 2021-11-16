import {usersApi} from "../api/api";
import {Dispatch} from "redux";

const initialState = {
    users: [] as Array<usersType>,
    pageSize: 100,
    totalUsers: 20,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>,
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
    toggleFetchingType | toggleFollowingType
type followType = ReturnType<typeof followSuccess>
type unfollowType = ReturnType<typeof unFollowSuccess>
type setUsersType = ReturnType<typeof setUsers>
type setCurrentPageType = ReturnType<typeof setCurrentPage>
type setTotalUsersCountType = ReturnType<typeof setTotalUsersCount>
type toggleFetchingType = ReturnType<typeof toggleFetching>
type toggleFollowingType = ReturnType<typeof toggleFollowing>


export const followSuccess = (userId: number) => {
    return {
        type: 'users/FOLLOW',
        userId: userId
    } as const
}
export const unFollowSuccess = (userId: number) => {
    return {
        type: 'users/UNFOLLOW',
        userId: userId
    } as const
}
export const setUsers = (users: Array<usersType>) => {
    return {
        type: 'users/SET-USERS',
        users
    } as const
}
export const setCurrentPage = (currentPage: number) => {
    return {
        type: 'users/SET-CURRENT-PAGE',
        currentPage
    } as const
}
export const setTotalUsersCount = (totalCount: number) => {
    return {
        type: 'users/SET-TOTAL-USERS-COUNT',
        totalCount
    } as const
}
export const toggleFetching = (fetching: boolean) => {
    return {
        type: 'users/TOGGLE-FETCHING',
        fetching
    } as const
}
export const toggleFollowing = (fetching: boolean, userId: number) => {
    return {
        type: 'users/TOGGLE-FOLLOWING',
        fetching,
        userId
    } as const
}

const UsersReducer = (state = initialState, action: actionsTypes): initialStateOfUsersType => {
    switch (action.type) {
        case 'users/FOLLOW':
            return {
                ...state,
                users: state.users.map(u => u.id === action.userId ? {...u, followed: true} : u)
            }
        case 'users/UNFOLLOW':
            return {
                ...state,
                users: state.users.map(u => u.id === action.userId ? {...u, followed: false} : u)
            }
        case 'users/SET-USERS':
            return {
                ...state, users: action.users
            }
        case 'users/SET-CURRENT-PAGE':
            return {
                ...state, currentPage: action.currentPage
            }
        case 'users/SET-TOTAL-USERS-COUNT':
            return {
                ...state, totalUsers: action.totalCount
            }
        case 'users/TOGGLE-FETCHING':
            return {
                ...state, isFetching: action.fetching
            }
        case 'users/TOGGLE-FOLLOWING':
            return {
                ...state,
                followingInProgress: action.fetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        default:
            return state
    }
}

export const getUsers = (currentPage: number, pageSize: number) => {
    return async (dispatch: Dispatch) => {
        dispatch(toggleFetching(true))
        usersApi.getUsers(currentPage, pageSize).then(data => {
            dispatch(toggleFetching(false))
            dispatch(setUsers(data.items))
            dispatch(setCurrentPage(currentPage))
            dispatch(setTotalUsersCount(data.totalCount))
        })
    }
}
export const follow = (userId: number) => {
    return (dispatch: Dispatch) => {
        dispatch(toggleFollowing(true, userId))
        usersApi.follow(userId)
            .then(data => {
                if (data.resultCode === 0) {
                    dispatch(followSuccess(userId))
                }
                dispatch(toggleFollowing(false, userId))
            })
    }
}
export const unFollow = (userId: number) => {
    return (dispatch: Dispatch) => {
        dispatch(toggleFollowing(true, userId))
        usersApi.unfollow(userId)
            .then(data => {
                if (data.resultCode === 0) {
                    dispatch(unFollowSuccess(userId))
                }
                dispatch(toggleFollowing(false, userId))
            })
    }
}


export default UsersReducer;