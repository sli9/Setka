import React from "react";
import {initialStateOfUsersType} from "../../Redux/users-reducer";
import {mapDispatchToPropsType} from "./UsersContainer";
import classes from './Users.module.css'
import axios from "axios";
import  DefaultPhoto from '../../assets/images/Default_User_Icon.png'


const Users = (props: initialStateOfUsersType & mapDispatchToPropsType) => {

    if (props.users.length === 0) {
       axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response => {
           props.setUsers(response.data.items)
       })
    }

    return <div>
        {props.users.map(u => <div key={u.id}>
            <span>
                <div>
                <img src={u.photos.small !== null ? u.photos.small : DefaultPhoto} className={classes.userPhoto} alt='image'/>
                </div>
                <div>
                {u.followed ?
                             <button onClick={() => {props.UnFollow(u.id)}}>Unfollow</button>
                            : <button onClick={() => {props.Follow(u.id)}}>Follow</button>}
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