import {Action, applyMiddleware, combineReducers, compose, createStore} from "redux";
import ProfileReducer from "./profile-reducer";
import DialogsReducer from "./dialogs-reducer";
import UsersReducer from "./users-reducer";
import AuthReducer from "./auth-reducer";
import thunkMiddleware, {ThunkAction} from "redux-thunk";
import {reducer as formReducer} from 'redux-form'
import AppReducer from "./app-reducer";
import ChatReducer from "./chat-reducer";

const rootReducer = combineReducers({
    profilePage: ProfileReducer,
    dialogsPage: DialogsReducer,
    usersPage: UsersReducer,
    auth: AuthReducer,
    form: formReducer,
    app: AppReducer,
    chat: ChatReducer,
})

export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never

export type BaseThunkType<A extends Action = Action, R = Promise<void>> = ThunkAction<R, AppRootStoreType, unknown, A>
//for extension chrome redux DevTools
//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));
// const store: Store<AppRootStoreType> = createStore(rootReducer);

//const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type AppRootStoreType = ReturnType<typeof rootReducer>

export default store;
//@ts-ignore
window.store = store