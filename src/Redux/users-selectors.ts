import {AppRootStoreType} from "./redux-store";
import {createSelector} from "reselect";
import {UsersSearchFormType, usersType} from "./users-reducer";

const getUsers = (state: AppRootStoreType) => {
    return state.usersPage.users
}
export const usersSelector = createSelector(getUsers,(users:Array<usersType>) =>{
    return users
})

const getPageSize = (state: AppRootStoreType) => {
    return state.usersPage.pageSize
}
export const pageSizeSelector = createSelector(getPageSize,(pageSize: number) =>{
    return pageSize
})

const getTotalUsers = (state: AppRootStoreType) => {
    return state.usersPage.totalUsers
}
export const totalUsersSelector = createSelector(getTotalUsers,(totalUsers: number) =>{
    return totalUsers
})

const getCurrentPage = (state: AppRootStoreType) => {
    return state.usersPage.currentPage
}
export const currentPageSelector = createSelector(getCurrentPage,(currentPage: number) =>{
    return currentPage
})

const getIsFetching = (state: AppRootStoreType) => {
    return state.usersPage.isFetching
}
export const isFetchingSelector = createSelector(getIsFetching,(isFetching: boolean) =>{
    return isFetching
})

const getFollowingInProgress = (state: AppRootStoreType) => {
    return state.usersPage.followingInProgress
}
export const followingInProgressSelector = createSelector(getFollowingInProgress,(followingInProgress: Array<number>) =>{
    return followingInProgress
})
const getUsersFilter = (state: AppRootStoreType) => {
    return state.usersPage.filter
}
export const usersFilterSelector = createSelector(getUsersFilter,(filter: UsersSearchFormType) =>{
    return filter
})