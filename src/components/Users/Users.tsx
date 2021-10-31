import React from "react";
import classes from './Users.module.css'
import DefaultPhoto from '../../assets/images/Default_User_Icon.png'
import {usersType} from "../../Redux/users-reducer";
import {NavLink} from "react-router-dom";

type UsersType = {
    totalUsers: number
    pageSize: number
    currentPage: number
    onChangePage: (p: number) => void
    users: Array<usersType>
    unFollow: (userId: number) => void
    follow: (userId: number) => void
    followingInProgress: Array<number>
}

function Users(props: UsersType) {
    const pagesCount = Math.ceil(props.totalUsers / props.pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    return <div>
        <div>
            {pages.map((p, i) => <span key={i} className={props.currentPage === p ? classes.selectedPage : ''}
                                       onClick={() => {
                                           props.onChangePage(p)
                                       }}>{` ${p}`}</span>)}
        </div>

        {props.users.map(u => <div key={u.id}>
            <span>
                <div>
                <NavLink to={'/profile/' + u.id}>
                    <img src={u.photos.small !== null ? u.photos.small : DefaultPhoto}
                         className={classes.userPhoto}
                         alt='img'/>
                </NavLink>
                </div>
                <div>
                {u.followed ?
                    <button disabled={props.followingInProgress.some(id => id === u.id)}
                            onClick={() => {
                                props.unFollow(u.id)
                            }}>Unfollow</button>
                    : <button disabled={props.followingInProgress.some(id => id === u.id)}
                              onClick={() => {
                                  props.follow(u.id)
                              }}>Follow</button>}
                                </div>
            </span>
            <div>{u.name}</div>
            <div>{u.status}</div>
            <span>
                <div>u.location.country</div>
                <div>u.location.city</div>
            </span>
        </div>)}
    </div>
}

export default Users;