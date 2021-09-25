import React from "react";
import {initialStateOfUsersType} from "../../Redux/users-reducer";
import {mapDispatchToPropsType} from "./UsersContainer";
import classes from './Users.module.css'
import axios from "axios";
import  DefaultPhoto from '../../assets/images/Default_User_Icon.png'


class Users extends React.Component<mapDispatchToPropsType & initialStateOfUsersType> {

   componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`).then(response => {
            this.props.setUsers(response.data.items)
        })
    }

    onChangePage(pageNumber: number) {
        this.props.setCurrentPage(pageNumber)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`).then(response => {
            this.props.setUsers(response.data.items)
            this.props.setTotalUsersCount(response.data.totalUsers)
        })
    }

    render() {

       const pagesCount = Math.ceil(this.props.totalUsers/this.props.pageSize)
        let pages = []
        for (let i=1; i<=pagesCount; i++) {
             pages.push(i)
        }

        return <div>
            <div>
                {pages.map(p => <span className={this.props.currentPage === p ? classes.selectedPage : ''}
                onClick={()=>{this.onChangePage(p)}}>{p}</span>)}
            </div>

        {this.props.users.map(u => <div key={u.id}>
            <span>
                <div>
                <img src={u.photos.small !== null ? u.photos.small : DefaultPhoto} className={classes.userPhoto} alt='image'/>
                </div>
                <div>
                {u.followed ?
                             <button onClick={() => {this.props.UnFollow(u.id)}}>Unfollow</button>
                            : <button onClick={() => {this.props.Follow(u.id)}}>Follow</button>}
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
}}

export default Users;