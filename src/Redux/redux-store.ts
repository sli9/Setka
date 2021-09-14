import {combineReducers, createStore} from "redux";
import ProfileReducer from "./profile-reducer";
import DialogsReducer from "./dialogs-reducer";

const rootReducer = combineReducers({
    profilePage: ProfileReducer,
    dialogsPage: DialogsReducer
})

// const store: Store<AppRootStoreType> = createStore(rootReducer);
const store = createStore(rootReducer);

export type AppRootStoreType = ReturnType<typeof rootReducer>

export default store;