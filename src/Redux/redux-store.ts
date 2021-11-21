import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import ProfileReducer from "./profile-reducer";
import DialogsReducer from "./dialogs-reducer";
import UsersReducer from "./users-reducer";
import AuthReducer from "./auth-reducer";
import thunkMiddleware from "redux-thunk";
import {reducer as formReducer} from 'redux-form'
import AppReducer from "./app-reducer";

const rootReducer = combineReducers({
    profilePage: ProfileReducer,
    dialogsPage: DialogsReducer,
    usersPage: UsersReducer,
    auth: AuthReducer,
    form: formReducer,
    app: AppReducer,
})

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