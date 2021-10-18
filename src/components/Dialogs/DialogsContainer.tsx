import Dialogs from "./Dialogs";
import {AddMessageTextAC, ChangeMessageTextAC, initialStateTypeofDialogs} from "../../Redux/dialogs-reducer";
import {connect} from "react-redux";
import {AppRootStoreType} from "../../Redux/redux-store";
import {Dispatch} from "redux";

export type mapStateToPropsType = initialStateTypeofDialogs & {isAuth: boolean}
const mapStateToProps = (state: AppRootStoreType): mapStateToPropsType => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages,
        newMessageText: state.dialogsPage.newMessageText,
        isAuth: state.auth.isAuth,
    }
}
export type mapDispatchToPropsType = {
    ChangeMessage: (text: string) => void
    AddMessage: () => void
}

const mapDispatchToProps = (dispatch: Dispatch): mapDispatchToPropsType => {
    return {
        ChangeMessage: (text: string) => {
            dispatch(ChangeMessageTextAC(text))
        },
        AddMessage: () => {
            dispatch(AddMessageTextAC())
        }
    }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)

export default DialogsContainer;