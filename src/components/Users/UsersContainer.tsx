import {connect} from "react-redux";
import Users from "./Users";
import {AppRootStoreType} from "../../Redux/redux-store";
import {Dispatch} from "redux";
import {
    followAC,
    initialStateOfUsersType,
    setCurrentPageAC, setTotalUsersCountAC,
    setUsersAC,
    unfollowAC,
    usersType
} from "../../Redux/users-reducer";

const mapStateToProps = (state: AppRootStoreType): initialStateOfUsersType => {
    return{
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsers: state.usersPage.totalUsers,
        currentPage: state.usersPage.currentPage
    }
}

export type mapDispatchToPropsType ={
    Follow: (userId: number) => void
    UnFollow: (userId: number) => void
    setUsers: (users: Array<usersType>) => void
    setCurrentPage: (pageNumber: number) => void
    setTotalUsersCount: (totalCount: number) => void
}
const mapDispatchToProps = (dispatch: Dispatch): mapDispatchToPropsType => {
    return{
        Follow: (userId: number) => {dispatch(followAC(userId))},
        UnFollow: (userId: number) => {dispatch(unfollowAC(userId))},
        setUsers: (users: Array<usersType>) => {dispatch(setUsersAC(users))},
        setCurrentPage: (pageNumber: number) => {dispatch(setCurrentPageAC(pageNumber))},
        setTotalUsersCount: (totalCount: number) => {dispatch(setTotalUsersCountAC(totalCount))},
    }

}

const UsersContainer = connect (mapStateToProps, mapDispatchToProps) (Users)

export default UsersContainer;