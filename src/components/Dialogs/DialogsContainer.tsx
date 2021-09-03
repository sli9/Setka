import React from "react";
import {storeType} from "../../Redux/state";
import {AddMessageTextAC, ChangeMessageTextAC} from "../../Redux/dialogs-reducer";
import Dialogs from "./Dialogs";

type DialogsContainerType = {
    store: storeType
}

const DialogsContainer = (props: DialogsContainerType) => {

    const ChangeMessage = (text: string) => {
        props.store.dispatch(ChangeMessageTextAC(text))
    }
    const AddMessage = () => {
        props.store.dispatch(AddMessageTextAC())
    }
    return <Dialogs ChangeMessage={ChangeMessage}
                    AddMessage={AddMessage}
                    dialogs={props.store.getState().dialogsPage.dialogs}
                    messages={props.store.getState().dialogsPage.messages}
                    newMessageText={props.store.getState().dialogsPage.newMessageText}/>
}

export default DialogsContainer;