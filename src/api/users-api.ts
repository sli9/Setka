import {instance, ResponseType} from "./api";
import {usersType} from "../Redux/users-reducer";

type UsersResponseType = {
    items: Array<usersType>
    totalCount: number
    error: string | null
}

export const usersApi = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get<UsersResponseType>(`users?page=${currentPage}&count=${pageSize}`)
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