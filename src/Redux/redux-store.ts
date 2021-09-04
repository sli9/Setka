import {combineReducers, createStore} from "redux";
import ProfileReducer from "./profile-reducer";
import DialogsReducer from "./dialogs-reducer";
import {storeType} from "./state";

const reducers = combineReducers({
    profilePage: ProfileReducer,
    dialogsPage: DialogsReducer
})

// const store: Store<AppRootStoreType> = createStore(reducers);
const store: storeType = createStore(reducers);

// export type AppRootStoreType = ReturnType<typeof reducers>

export default store;