import React from "react";
import {initialStateOfUsersType} from "../../Redux/users-reducer";
import {mapDispatchToPropsType} from "./UsersContainer";
import classes from './Users.module.css'


const Users = (props: initialStateOfUsersType & mapDispatchToPropsType) => {

    if (props.users.length === 0) {
        props.setUsers(
            [
                {
                    id: '1',
                    photoUrl: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
                    followed: false,
                    name: 'Andrey',
                    status: 'aslkdasdlks',
                    location: {city: 'Minsk', country: 'Belarus'}
                },
                {
                    id: '2',
                    photoUrl: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
                    followed: false,
                    name: 'Puto',
                    status: '!!aslkdasd!!!lks',
                    location: {city: 'Moscow', country: 'Russia'}
                },
                {
                    id: '3',
                    photoUrl: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
                    followed: false,
                    name: 'Tkach',
                    status: 'dsddaslkdasdlks',
                    location: {city: 'Lida', country: 'Belarus'}
                }
            ]
        )
    }

    return <div>
        {props.users.map(u => <div key={u.id}>
            <span>
                <div>
                <img src={u.photoUrl} className={classes.userPhoto} alt='image'/>
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
                <div>{u.location.country}</div>
                <div>{u.location.city}</div>
            </span>
        </div>)}
    </div>
}

export default Users;