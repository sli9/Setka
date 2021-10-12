import {applyMiddleware, combineReducers, createStore} from "redux";
import ProfileReducer from "./profile-reducer";
import DialogsReducer from "./dialogs-reducer";
import UsersReducer from "./users-reducer";
import AuthReducer from "./auth-reducer";
import thunkMiddleware from "redux-thunk"

const rootReducer = combineReducers({
    profilePage: ProfileReducer,
    dialogsPage: DialogsReducer,
    usersPage: UsersReducer,
    auth: AuthReducer,
})

// const store: Store<AppRootStoreType> = createStore(rootReducer);
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type AppRootStoreType = ReturnType<typeof rootReducer>

export default store;
//@ts-ignore
window.store = store