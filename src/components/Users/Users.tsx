import React from "react";
import classes from './Users.module.css'
import DefaultPhoto from '../../assets/images/Default_User_Icon.png'
import {usersType} from "../../Redux/users-reducer";

type UsersType = {
    totalUsers: number
    pageSize: number
    currentPage: number
    onChangePage: (p: number) => void
    users:  Array<usersType>
    UnFollow: (userId: number) => void
    Follow: (userId: number) => void
}

function Users(props: UsersType)  {
        const pagesCount = Math.ceil(props.totalUsers/props.pageSize)
        let pages = []
        for (let i=1; i<=pagesCount; i++) {
             pages.push(i)
        }

        return <div>
            <div>
                {pages.map(p => <span className={props.currentPage === p ? classes.selectedPage : ''}
                onClick={()=>{props.onChangePage(p)}}>{p}</span>)}
            </div>

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