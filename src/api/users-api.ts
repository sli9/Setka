import {instance, ResponseType} from "./api";
import {usersType} from "../Redux/users-reducer";

export type UsersResponseType = {
    items: Array<usersType>
    totalCount: number
    error: string | null
}

export const usersApi = {
    getUsers(currentPage: number = 1, pageSize: number = 10, term: string = '', friend: null | boolean = null) {
        return instance.get<UsersResponseType>(`users?page=${currentPage}&count=${pageSize}&term=${term}`+(friend === null ? '' : `&friend=${friend}`))
            .then(response => response.data)
    },
    unfollow(userId: number) {
        return instance.delete<ResponseType>(`follow/${userId}`)
            .then(response => response.data)
    },
    follow(userId: number) {
        return instance.post<ResponseType>(`follow/${userId}`)
            .then(response => response.data)
    },
}