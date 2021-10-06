import {connect} from "react-redux";
import Users from "./Users";
import {AppRootStoreType} from "../../Redux/redux-store";
import {
    follow,
    initialStateOfUsersType,
    setCurrentPage,
    setTotalUsersCount,
    setUsers,
    toggleFetching, toggleFollowing,
    unfollow,
    usersType
} from "../../Redux/users-reducer";
import React from "react";
import {Preloader} from "../common/Preloader";
import {usersApi} from "../../api/api";


class UsersContainer extends React.Component<mapDispatchToPropsType & initialStateOfUsersType> {

    componentDidMount() {
        this.props.toggleFetching(true)
        usersApi.getUsers(this.props.currentPage,this.props.pageSize).then(data => {
            this.props.toggleFetching(false)
            this.props.setUsers(data.items)
            this.props.setTotalUsersCount(data.totalCount)
        })
    }

    onChangePage = (pageNumber: number) => {
        this.props.toggleFetching(true)
        this.props.setCurrentPage(pageNumber)
        usersApi.getUsers(pageNumber,this.props.pageSize).then(data => {
            this.props.toggleFetching(false)
            this.props.setUsers(data.items)
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
                Follow={this.props.follow}
                followingInProgress={this.props.followingInProgress}
                toggleFollowing={this.props.toggleFollowing}
            />
        </>
    }
}


const mapStateToProps = (state: AppRootStoreType): initialStateOfUsersType => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsers: state.usersPage.totalUsers,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress,
    }
}

export type mapDispatchToPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: Array<usersType>) => void
    setCurrentPage: (pageNumber: number) => void
    setTotalUsersCount: (totalCount: number) => void
    toggleFetching: (fetching: boolean) => void
    toggleFollowing: (fetching: boolean, userId: number) => void
}


export default connect(mapStateToProps, {
    follow, unfollow, setUsers, setCurrentPage,
    setTotalUsersCount, toggleFetching, toggleFollowing
})(UsersContainer)

