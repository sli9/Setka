import {connect} from "react-redux";
import Users from "./Users";
import {AppRootStoreType} from "../../Redux/redux-store";
import {actions, follow, getUsers, initialStateOfUsersType, unFollow} from "../../Redux/users-reducer";
import React from "react";
import {Preloader} from "../common/Preloader";
import {compose} from "redux";
import {
    currentPageSelector,
    followingInProgressSelector,
    isFetchingSelector,
    pageSizeSelector,
    totalUsersSelector,
    usersSelector
} from "../../Redux/users-selectors";


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
        users: usersSelector(state),
        pageSize: pageSizeSelector(state),
        totalUsers: totalUsersSelector(state),
        currentPage: currentPageSelector(state),
        isFetching: isFetchingSelector(state),
        followingInProgress: followingInProgressSelector(state),
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
    connect(mapStateToProps, {
        follow,
        unFollow,
        setTotalUsersCount: actions.setTotalUsersCount,
        getUsers, toggleFollowing: actions.toggleFollowing
    })
)(UsersContainer)

