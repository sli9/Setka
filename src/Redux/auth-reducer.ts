import {Dispatch} from "redux";
import {authApi} from "../api/api";
import {ThunkDispatch} from "redux-thunk";
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

export type actionsTypes = ReturnType<typeof SetAuthUserData>

const SetAuthUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean ) => ({
    type: 'SET-USER-DATA',
    payload: {id, email, login, isAuth},
} as const)

export const getAuthUserData = () => (dispatch: Dispatch) => {
    authApi.me().then(response => {
        if (response.data.resultCode === 0) {
            let {id, email, login} = response.data.data
            dispatch(SetAuthUserData(id, email, login, true))
        }
    })
}
export const login = (email: string, password: string, rememberMe: boolean) => (dispatch: ThunkDispatch<AppRootStoreType, unknown, actionsTypes>) => {
    authApi.login(email, password, rememberMe).then(response => {
        if (response.data.resultCode === 0) {
            dispatch(getAuthUserData())
        }
    })
}
export const logout = () => (dispatch: Dispatch) => {
    authApi.logout().then(response => {
        if (response.data.resultCode === 0) {
            dispatch(SetAuthUserData(null, null, null, false))
        }
    })
}


const AuthReducer = (state: initialStateAuthType = initialState, action: actionsTypes): initialStateAuthType => {

    switch (action.type) {
        case 'SET-USER-DATA':
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state
    }
}
export default AuthReducer