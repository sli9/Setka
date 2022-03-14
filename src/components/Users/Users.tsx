import React from "react";
import {UsersSearchFormType, usersType} from "../../Redux/users-reducer";
import {Paginator} from "../common/paginator/Paginator";
import User from "./User";
import {UsersSearchForm} from "./UsersSearchForm";

type UsersType = {
    totalUsers: number
    pageSize: number
    currentPage: number
    onChangePage: (p: number) => void
    users: Array<usersType>
    unFollow: (userId: number) => void
    follow: (userId: number) => void
    followingInProgress: Array<number>
    onFilterChanged: (filter:UsersSearchFormType) => void
}

function Users(props: UsersType) {

    return <div>
        <Paginator currentPage={props.currentPage}
                   totalUsers={props.totalUsers}
                   pageSize={props.pageSize}
                   onChangePage={props.onChangePage}
                   portion={10}/>

        <UsersSearchForm onFilterChanged={props.onFilterChanged}/>

        {props.users.map(u => <User key={u.id}
                                    followingInProgress={props.followingInProgress}
                                    follow={props.follow}
                                    unFollow={props.unFollow}
                                    user={u}/>)}
    </div>
}

export default Users;