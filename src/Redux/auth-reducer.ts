import {Dispatch} from "redux";
import {authApi} from "../api/api";
import {ThunkDispatch} from "redux-thunk";
import {FormAction, stopSubmit} from "redux-form";
import {AppRootStoreType} from "./redux-store";

const initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
}

export type initialStateAuthType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}

export type actionsTypes = ReturnType<typeof SetAuthUserData> | FormAction

const SetAuthUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
    type: 'auth/SET-USER-DATA',
    payload: {id, email, login, isAuth},
} as const)

export const getAuthUserData = () => async (dispatch: Dispatch) => {
    const response = await authApi.me()
        if (response.data.resultCode === 0) {
            let {id, email, login} = response.data.data
            dispatch(SetAuthUserData(id, email, login, true))
        }
}
export const login = (email: string, password: string, rememberMe: boolean) =>
    async (dispatch: ThunkDispatch<AppRootStoreType, unknown, actionsTypes>) => {
        const response = await authApi.login(email, password, rememberMe)
            if (response.data.resultCode === 0) {
                dispatch(getAuthUserData())
            } else {
                const message = response.data.messages.length > 0 ? response.data.messages[0] : 'Something wrong'
                const formAction = stopSubmit('login', {_error: message});
                dispatch(formAction)
            }
    }
export const logout = () => async (dispatch: Dispatch) => {
    const response = await authApi.logout()
        if (response.data.resultCode === 0) {
            dispatch(SetAuthUserData(null, null, null, false))
        }
}


const AuthReducer = (state: initialStateAuthType = initialState, action: actionsTypes): initialStateAuthType => {

    switch (action.type) {
        case 'auth/SET-USER-DATA':
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state
    }
}
export default AuthReducer