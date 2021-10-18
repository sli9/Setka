import {Dispatch} from "redux";
import {authApi} from "../api/api";

const initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    // isFetching: false,
}

export type initialStateAuthType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    // isFetching: boolean
}

export type actionsTypes = ReturnType<typeof SetAuthUserData>

const SetAuthUserData = (id: number, email: string, login: string) => ({type: 'SET-USER-DATA', data:{id, email, login}} as const)

export const getAuthUserData = () => (dispatch: Dispatch) => {
    authApi.me().then(response => {
        if (response.data.resultCode === 0) {
            let {id, email, login} = response.data.data
            dispatch(SetAuthUserData(id, email, login))
        }
    })
}


const AuthReducer = (state: initialStateAuthType = initialState, action: actionsTypes): initialStateAuthType => {

    switch (action.type) {
        case 'SET-USER-DATA':
            return {
                ...state,
                ...action.data,
                isAuth: true
            }
        default:
            return state
    }
}
export default AuthReducer