import React from "react";
import StoreContext from "../../StoreContext";
import Dialogs from "./Dialogs";
import {AddMessageTextAC, ChangeMessageTextAC} from "../../Redux/dialogs-reducer";


const DialogsContainer = () => {

    return <StoreContext.Consumer>
        {
    (store) => {
        const ChangeMessage = (text: string) => {
        store.dispatch(ChangeMessageTextAC(text))
    }
        const AddMessage = () => {
        store.dispatch(AddMessageTextAC())
    }
        return <Dialogs ChangeMessage={ChangeMessage}
        AddMessage={AddMessage}
        dialogs={store.getState().dialogsPage.dialogs}
        messages={store.getState().dialogsPage.messages}
        newMessageText={store.getState().dialogsPage.newMessageText}/>
    }}

    </StoreContext.Consumer>
}

export default DialogsContainer;