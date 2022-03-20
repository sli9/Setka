import {useSelector} from "react-redux";
import Users from "./Users";
import React from "react";
import {Preloader} from "../common/Preloader";
import {getIsFetching} from "../../Redux/users-selectors";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";


const UsersContainer = () => {

    const isFetching = useSelector(getIsFetching)

    return <>
        {isFetching ? <Preloader/> : null}
        <Users/>
    </>
}
export const UsersPage = withAuthRedirect(UsersContainer)


