import {connect} from "react-redux";
import Users from "./Users";
import {AppRootStoreType} from "../../Redux/redux-store";
import {
    follow,
    getUsers,
    initialStateOfUsersType,
    setTotalUsersCount,
    toggleFollowing,
    unFollow
} from "../../Redux/users-reducer";
import React from "react";
import {Preloader} from "../common/Preloader";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";


class UsersContainer extends React.Component<mapDispatchToPropsType & initialStateOfUsersType> {

    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    onChangePage = (pageNumber: number) => {
        this.props.getUsers(pageNumber, this.props.pageSize)
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
                unFollow={this.props.unFollow}
                follow={this.props.follow}
                followingInProgress={this.props.followingInProgress}

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
    unFollow: (userId: number) => void
    setTotalUsersCount: (totalCount: number) => void
    toggleFollowing: (fetching: boolean, userId: number) => void
    getUsers: (currentPage: number, pageSize: number) => void
}


export default compose<React.ComponentType>(
    connect(mapStateToProps, {follow, unFollow, setTotalUsersCount, getUsers, toggleFollowing}),
    withAuthRedirect)(UsersContainer)

