import Dialogs from "./Dialogs";
import {AddMessageTextAC, initialStateTypeofDialogs} from "../../Redux/dialogs-reducer";
import {connect} from "react-redux";
import {AppRootStoreType} from "../../Redux/redux-store";
import {compose, Dispatch} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

export type mapStateToPropsType = initialStateTypeofDialogs
const mapStateToProps = (state: AppRootStoreType): initialStateTypeofDialogs => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages,
    }
}
export type mapDispatchToPropsType = {
    AddMessage: (value: string) => void
}

const mapDispatchToProps = (dispatch: Dispatch): mapDispatchToPropsType => {
    return {
        AddMessage: (value) => {
            dispatch(AddMessageTextAC(value))
        }
    }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)

export default compose<React.ComponentType>(
    DialogsContainer,
    withAuthRedirect,
)(Dialogs);