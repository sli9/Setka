import {connect} from "react-redux";
import Users from "./Users";
import {AppRootStoreType} from "../../Redux/redux-store";
import {Dispatch} from "redux";
import {followAC, initialStateOfUsersType, setUsersAC, unfollowAC, usersType} from "../../Redux/users-reducer";

const mapStateToProps = (state: AppRootStoreType): initialStateOfUsersType => {
    return{
        users: state.usersPage.users
    }
}

export type mapDispatchToPropsType ={
    Follow: (userId: string) => void
    UnFollow: (userId: string) => void
    setUsers: (users: Array<usersType>) => void
}
const mapDispatchToProps = (dispatch: Dispatch): mapDispatchToPropsType => {
    return{
        Follow: (userId: string) => {dispatch(followAC(userId))},
        UnFollow: (userId: string) => {dispatch(unfollowAC(userId))},
        setUsers: (users: Array<usersType>) => {dispatch(setUsersAC(users))}
    }

}


const UsersContainer = connect (mapStateToProps, mapDispatchToProps) (Users)

export default UsersContainer;