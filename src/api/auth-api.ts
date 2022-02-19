import {CaptchaResultCode, instance, ResponseType, ResultCodes} from "./api";

type MeDataType = {
    id: number
    email: string
    login: string
}
type LoginDataType = {
    data: { id: number }
}
export const authApi = {
    me() {
        return instance.get<ResponseType<MeDataType>>(`auth/me`)
    },
    login(email: string, password: string, rememberMe: boolean, captcha: string | null = null) {
        return instance.post<ResponseType<LoginDataType, ResultCodes | CaptchaResultCode>>(`auth/login`, {email, password, rememberMe, captcha})
    },
    logout() {
        return instance.delete(`auth/login`)
    }
}