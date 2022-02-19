import {CaptchaResultCode, ResultCodes} from "../api/api";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {FormAction, stopSubmit} from "redux-form";
import {AppRootStoreType} from "./redux-store";
import {authApi} from "../api/auth-api";
import {securityApi} from "../api/security-api";

const initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null,
}

export type initialStateAuthType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    captchaUrl: string | null
}

export type actionsTypes = ReturnType<typeof SetAuthUserData> | FormAction

//actions
const SetAuthUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
    type: 'auth/SET-USER-DATA',
    payload: {id, email, login, isAuth},
} as const)
const SetCaptchaUrl = (captchaUrl: string) => ({
    type: 'auth/GET-CAPTCHA-URL',
    payload: {captchaUrl},
} as const)

//thunks
export const getAuthUserData = (): ThunkAction<Promise<void>, AppRootStoreType, any, actionsTypes> => async (dispatch) => {
    const response = await authApi.me()
    if (response.data.resultCode === ResultCodes.success) {
        let {id, email, login} = response.data.data
        dispatch(SetAuthUserData(id, email, login, true))
    }
}
export const login = (email: string, password: string, rememberMe: boolean, captcha: string) =>
    async (dispatch: ThunkDispatch<AppRootStoreType, unknown, actionsTypes>) => {
        const response = await authApi.login(email, password, rememberMe, captcha)
        if (response.data.resultCode === ResultCodes.success) {
            dispatch(getAuthUserData())
        } else {
            if (response.data.resultCode === CaptchaResultCode.captchaIsRequired) {
                dispatch(getCaptchaUrl())
            }
            const message = response.data.messages.length > 0 ? response.data.messages[0] : 'Something wrong'
            const formAction = stopSubmit('login', {_error: message});
            dispatch(formAction)
        }
    }
export const getCaptchaUrl = () => async (dispatch: ThunkDispatch<AppRootStoreType, unknown, actionsTypes>) => {
    const response = await securityApi.captchaUrl()
    const captchaUrl = response.data.url
    dispatch(SetCaptchaUrl(captchaUrl))
}
export const logout = (): ThunkAction<Promise<void>, AppRootStoreType, any, actionsTypes> => async (dispatch) => {
    const response = await authApi.logout()
    if (response.data.resultCode === ResultCodes.success) {
        dispatch(SetAuthUserData(null, null, null, false))
    }
}

//reducer
const AuthReducer = (state: initialStateAuthType = initialState, action: actionsTypes): initialStateAuthType => {

    switch (action.type) {
        case 'auth/SET-USER-DATA':
        case 'auth/GET-CAPTCHA-URL':
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state
    }
}
export default AuthReducer