import {FormAction} from "redux-form";
import {getAuthUserData} from "./auth-reducer";
import {ThunkDispatch} from "redux-thunk";
import {AppRootStoreType} from "./redux-store";

const initialState = {
    initialized: false
}

export type initialStateAppType = {
    initialized: boolean
}

export type actionsTypes = ReturnType<typeof InitializedSuccess> | FormAction

const InitializedSuccess = () => ({type: 'app/INITIALIZED-SUCCESS'} as const)

export const initializeApp = () => (dispatch: ThunkDispatch<AppRootStoreType, unknown, actionsTypes>) => {
    dispatch(getAuthUserData()).then(() => {
        dispatch(InitializedSuccess())
    })
}


const AppReducer = (state: initialStateAppType = initialState, action: actionsTypes): initialStateAppType => {

    switch (action.type) {
        case 'app/INITIALIZED-SUCCESS':
            return {
                ...state,
                initialized: true,
            }
        default:
            return state
    }
}
export default AppReducer