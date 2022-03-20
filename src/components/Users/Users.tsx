import React, {useEffect} from "react";
import {follow, getUsers, unFollow, UsersSearchFormType} from "../../Redux/users-reducer";
import {Paginator} from "../common/paginator/Paginator";
import User from "./User";
import {UsersSearchForm} from "./UsersSearchForm";
import {
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getTotalUsers,
    getUsersFilter,
    getUsersSelector
} from "../../Redux/users-selectors";
import {useDispatch, useSelector} from "react-redux";


function Users() {

    const users = useSelector(getUsersSelector)
    const totalUsers = useSelector(getTotalUsers)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const followingInProgress = useSelector(getFollowingInProgress)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUsers(currentPage, pageSize, filter))
    }, [])

    const onChangePage = (pageNumber: number) => {
        dispatch(getUsers(pageNumber, pageSize, filter))
    }
    const onFilterChanged = (filter: UsersSearchFormType) => {
        dispatch(getUsers(1, pageSize, filter))
    }
    const unFollowCB = (userId: number) => {
        dispatch(unFollow(userId))
    }
    const followCB = (userId: number) => {
        dispatch(follow(userId))
    }

    return <div>
        <Paginator currentPage={currentPage}
                   totalUsers={totalUsers}
                   pageSize={pageSize}
                   onChangePage={onChangePage}
                   portion={10}/>

        <UsersSearchForm onFilterChanged={onFilterChanged}/>

        {users.map(u => <User key={u.id}
                              followingInProgress={followingInProgress}
                              follow={followCB}
                              unFollow={unFollowCB}
                              user={u}/>)}
    </div>
}

export default Users;