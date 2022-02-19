import axios from "axios";

export const instance = axios.create({
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


export type ResponseType<D = {}, RC = ResultCodes> = {
    data: D
    resultCode: RC
    messages: Array<string>
}