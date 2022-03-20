import {AppRootStoreType} from "./redux-store";
import {createSelector} from "reselect";
import {usersType} from "./users-reducer";

const getUsers = (state: AppRootStoreType) => {
    return state.usersPage.users
}
export const getUsersSelector = createSelector(getUsers,(users:Array<usersType>) =>{
    return users.filter(u=> u ? u : false)
})

export const getPageSize = (state: AppRootStoreType) => {
    return state.usersPage.pageSize
}

 export const getTotalUsers = (state: AppRootStoreType) => {
    return state.usersPage.totalUsers
}

export const getCurrentPage = (state: AppRootStoreType) => {
    return state.usersPage.currentPage
}

export const getIsFetching = (state: AppRootStoreType) => {
    return state.usersPage.isFetching
}

export const getFollowingInProgress = (state: AppRootStoreType) => {
    return state.usersPage.followingInProgress
}

export const getUsersFilter = (state: AppRootStoreType) => {
    return state.usersPage.filter
}
