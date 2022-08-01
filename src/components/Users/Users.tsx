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
import {useHistory} from "react-router-dom";
import * as queryString from "querystring";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";


type QueryParamsType = { term?: string, page?: string, friend?: string };

function Uusers() {

    const users = useSelector(getUsersSelector)
    const totalUsers = useSelector(getTotalUsers)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const followingInProgress = useSelector(getFollowingInProgress)

    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        const parsedQueryString = queryString.parse(history.location.search.substr(1)) as QueryParamsType //sbstr is method of String

        let actualPage = currentPage
        let actualFilter = filter

        if (!!parsedQueryString.page) actualPage = Number(parsedQueryString.page)
        if (!!parsedQueryString.term) actualFilter = {...actualFilter, term: parsedQueryString.term}
        switch (parsedQueryString.friend) {
            case 'null':
                actualFilter = {...actualFilter, friend: null}
                break
            case 'true':
                actualFilter = {...actualFilter, friend: true}
                break
            case 'false':
                actualFilter = {...actualFilter, friend: false}
                break
        }

        dispatch(getUsers(actualPage, pageSize, actualFilter))
    }, [])

    useEffect(() => {
        const query: QueryParamsType = {}
        if (filter.term) query.term = filter.term
        if (filter.friend !== null) query.friend = String(filter.friend)
        if (currentPage) query.page = String(currentPage)

        history.push({
            pathname: '/users',
            search: queryString.stringify(query)
        })
    }, [filter, currentPage])

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

export const Users = withAuthRedirect(Uusers);