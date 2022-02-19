import axios from "axios";
import {profileType} from "../Redux/profile-reducer";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': '8d082859-ca9a-4da1-b0ef-8a94d073f65b',
    },
})

export enum ResultCodes {
    success = 0,
    error = 1,
}
export enum CaptchaResultCode {
    captchaIsRequired = 10,
}

export const usersApi = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },
    unfollow(userId: number) {
        return instance.delete(`follow/${userId}`)
            .then(response => response.data)
    },
    follow(userId: number) {
        return instance.post(`follow/${userId}`)
            .then(response => response.data)
    },
    getProfile(userId: string) {// obsolete method, use profileApi
        return profileApi.getProfile(userId)
    },
}
export const profileApi = {
    updateStatus(status: string) {
        return instance.put(`profile/status`, {status})
    },
    getStatus(userId: string) {
        return instance.get(`profile/status/${userId}`)
    },
    getProfile(userId: string) {
        return instance.get(`profile/${userId}`)
            .then(response => response.data)
    },
    saveAva(ava: File) {
        const formData = new FormData()
        formData.append('image', ava)
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    saveProfile(profile: profileType) {
        return instance.put(`profile`, profile)
    }
}

type MeType = {
    data: {id: number, email: string, login: string}
    resultCode: ResultCodes
    messages: Array<string>
}
type LoginType = {
    data: {id: number}
    resultCode: CaptchaResultCode | ResultCodes
    messages: Array<string>
}

export const authApi = {
    me() {
        return instance.get<MeType>(`auth/me`)
    },
    login(email: string, password: string, rememberMe: boolean, captcha: string | null = null) {
        return instance.post<LoginType>(`auth/login`, {email, password, rememberMe, captcha})
    },
    logout() {
        return instance.delete(`auth/login`)
    }
}
export const securityApi = {
    captchaUrl() {
        return instance.get(`security/get-captcha-url`)
    }
}

