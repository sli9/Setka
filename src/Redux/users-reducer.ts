import {ResultCodes} from "../api/api";
import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {usersApi} from "../api/users-api";

const initialState = {
    users: [] as Array<usersType>,
    pageSize: 10,
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


//actions
type actionsTypes = InferActionsTypes<typeof actions>

export const actions = {
    followSuccess: (userId: number) => {
        return {
            type: 'users/FOLLOW',
            userId: userId
        } as const
    },
    unFollowSuccess: (userId: number) => {
        return {
            type: 'users/UNFOLLOW',
            userId: userId
        } as const
    },
    setUsers: (users: Array<usersType>) => {
        return {
            type: 'users/SET-USERS',
            users
        } as const
    },
    setCurrentPage: (currentPage: number) => {
        return {
            type: 'users/SET-CURRENT-PAGE',
            currentPage
        } as const
    },
    setTotalUsersCount: (totalCount: number) => {
        return {
            type: 'users/SET-TOTAL-USERS-COUNT',
            totalCount
        } as const
    },
    toggleFetching: (fetching: boolean) => {
        return {
            type: 'users/TOGGLE-FETCHING',
            fetching
        } as const
    },
    toggleFollowing: (fetching: boolean, userId: number) => {
        return {
            type: 'users/TOGGLE-FOLLOWING',
            fetching,
            userId
        } as const
    },
}


//thunks
export const getUsers = (currentPage: number, pageSize: number): BaseThunkType<actionsTypes> => {
    return async (dispatch) => {
        dispatch(actions.toggleFetching(true))
        const data = await usersApi.getUsers(currentPage, pageSize)
        dispatch(actions.toggleFetching(false))
        dispatch(actions.setUsers(data.items))
        dispatch(actions.setCurrentPage(currentPage))
        dispatch(actions.setTotalUsersCount(data.totalCount))
    }
}
export const follow = (userId: number): BaseThunkType<actionsTypes> => {
    return async (dispatch) => {
        dispatch(actions.toggleFollowing(true, userId))
        const data = await usersApi.follow(userId)

        if (data.resultCode === ResultCodes.success) {
            dispatch(actions.followSuccess(userId))
        }
        dispatch(actions.toggleFollowing(false, userId))
    }
}
export const unFollow = (userId: number): BaseThunkType<actionsTypes> => {
    return async (dispatch) => {
        dispatch(actions.toggleFollowing(true, userId))
        const data = await usersApi.unfollow(userId)
        if (data.resultCode === ResultCodes.success) {
            dispatch(actions.unFollowSuccess(userId))
        }
        dispatch(actions.toggleFollowing(false, userId))
    }
}

//reducer
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


export default UsersReducer;