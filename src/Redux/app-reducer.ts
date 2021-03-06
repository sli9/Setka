import {getAuthUserData} from "./auth-reducer";
import {ThunkDispatch} from "redux-thunk";
import {AppRootStoreType} from "./redux-store";

const initialState = {
    initialized: false
}

export type initialStateAppType = typeof initialState

export type actionsTypes = ReturnType<typeof InitializedSuccess>

const InitializedSuccess = () => ({type: 'app/INITIALIZED-SUCCESS'} as const)

export const initializeApp = () => (dispatch: ThunkDispatch<AppRootStoreType, unknown, actionsTypes>) => {
    const pr = dispatch(getAuthUserData())
    Promise.all([pr]).then(() => {
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