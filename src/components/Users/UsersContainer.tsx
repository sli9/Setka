import {connect} from "react-redux";
import Users from "./Users";
import {AppRootStoreType} from "../../Redux/redux-store";
import {
    follow,
    initialStateOfUsersType,
    setCurrentPage,
    setTotalUsersCount,
    setUsers,
    toggleFetching,
    unfollow,
    usersType
} from "../../Redux/users-reducer";
import axios from "axios";
import React from "react";
import {Preloader} from "../common/Preloader";


class UsersContainer extends React.Component<mapDispatchToPropsType & initialStateOfUsersType> {

    componentDidMount() {
        this.props.toggleFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`,
            {withCredentials: true}).then(response => {
            this.props.toggleFetching(false)
            this.props.setUsers(response.data.items)
            this.props.setTotalUsersCount(response.data.totalCount)
        })
    }

    onChangePage = (pageNumber: number) => {
        this.props.toggleFetching(true)
        this.props.setCurrentPage(pageNumber)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`,
            {withCredentials: true}).then(response => {
            this.props.toggleFetching(false)
            this.props.setUsers(response.data.items)
        })
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users
                totalUsers={this.props.totalUsers}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onChangePage={this.onChangePage}
                users={this.props.users}
                UnFollow={this.props.unfollow}
                Follow={this.props.follow}/>
        </>
    }
}


const mapStateToProps = (state: AppRootStoreType): initialStateOfUsersType => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsers: state.usersPage.totalUsers,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching
    }
}

export type mapDispatchToPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: Array<usersType>) => void
    setCurrentPage: (pageNumber: number) => void
    setTotalUsersCount: (totalCount: number) => void
    toggleFetching: (fetching: boolean) => void
}


export default connect(mapStateToProps, {
    follow, unfollow, setUsers, setCurrentPage,
    setTotalUsersCount, toggleFetching
})(UsersContainer)

