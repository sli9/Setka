import {connect} from "react-redux";
import Users from "./Users";
import {AppRootStoreType} from "../../Redux/redux-store";
import {
    actions,
    follow,
    getUsers,
    initialStateOfUsersType,
    unFollow,
    UsersSearchFormType
} from "../../Redux/users-reducer";
import React from "react";
import {Preloader} from "../common/Preloader";
import {compose} from "redux";
import {
    currentPageSelector,
    followingInProgressSelector,
    isFetchingSelector,
    pageSizeSelector,
    totalUsersSelector,
    usersFilterSelector,
    usersSelector
} from "../../Redux/users-selectors";


class UsersContainer extends React.Component<mapDispatchToPropsType & initialStateOfUsersType> {

    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize, this.props.filter)
    }

    onChangePage = (pageNumber: number) => {
        this.props.getUsers(pageNumber, this.props.pageSize, this.props.filter)
    }

    onFilterChanged = (filter: UsersSearchFormType) => {
        this.props.getUsers(1, this.props.pageSize, filter)
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users
                totalUsers={this.props.totalUsers}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onFilterChanged={this.onFilterChanged}
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
        users: usersSelector(state),
        pageSize: pageSizeSelector(state),
        totalUsers: totalUsersSelector(state),
        currentPage: currentPageSelector(state),
        isFetching: isFetchingSelector(state),
        followingInProgress: followingInProgressSelector(state),
        filter: usersFilterSelector(state)
    }
}

export type mapDispatchToPropsType = {
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    setTotalUsersCount: (totalCount: number) => void
    toggleFollowing: (fetching: boolean, userId: number) => void
    getUsers: (currentPage: number, pageSize: number, filter: UsersSearchFormType) => void
}


export default compose<React.ComponentType>(
    connect(mapStateToProps, {
        follow,
        unFollow,
        setTotalUsersCount: actions.setTotalUsersCount,
        getUsers, toggleFollowing: actions.toggleFollowing
    })
)(UsersContainer)

