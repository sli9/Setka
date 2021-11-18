import React from "react";
import classes from './Users.module.css'
import DefaultPhoto from '../../assets/images/Default_User_Icon.png'
import {usersType} from "../../Redux/users-reducer";
import {NavLink} from "react-router-dom";

type UserType = {
    followingInProgress: Array<number>
    unFollow: (userId: number) => void
    follow: (userId: number) => void
    user: usersType
}

function User(props: UserType) {

    return <div>
            <span>
                <div>
                <NavLink to={'/profile/' + props.user.id}>
                    <img src={props.user.photos.small !== null ? props.user.photos.small : DefaultPhoto}
                         className={classes.userPhoto}
                         alt='img'/>
                </NavLink>
                </div>
                <div>
                {props.user.followed ?
                    <button disabled={props.followingInProgress.some(id => id === props.user.id)}
                            onClick={() => {
                                props.unFollow(props.user.id)
                            }}>Unfollow</button>
                    : <button disabled={props.followingInProgress.some(id => id === props.user.id)}
                              onClick={() => {
                                  props.follow(props.user.id)
                              }}>Follow</button>}
                                </div>
            </span>
        <div>{props.user.name}</div>
        <div>{props.user.status}</div>
        <span>
                <div>u.location.country</div>
                <div>u.location.city</div>
            </span>
    </div>
}

export default User;