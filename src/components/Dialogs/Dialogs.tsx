import React, {ChangeEvent} from "react";
import classes from "./Dialogs.module.css"
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {actionsTypes, dialogType, messageType} from "../../Redux/state";
import {AddMessageTextAC, ChangeMessageTextAC} from "../../Redux/dialogs-reducer";

type DialogsPropsType = {
    dialogs: Array<dialogType>
    messages: Array<messageType>
    newMessageText: string
    dispatch: (action: actionsTypes) => void
}

const Dialogs = (props: DialogsPropsType) => {
    let dialogsItem = props.dialogs.map(d => <DialogItem name={d.name} id={d.id}/>)
    let messagesItem = props.messages.map(message => <Message message={message.message}/>)

    const changeTextHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.dispatch(ChangeMessageTextAC(e.currentTarget.value))
    }
    const addMessageHandler = () => {
        props.dispatch(AddMessageTextAC())
    }
    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItem}>
                {dialogsItem}
            </div>
            <div className={classes.messages}>
                {messagesItem}
                <div>
                    <textarea value={props.newMessageText} onChange={changeTextHandler}></textarea>
                </div>
                <div>
                    <button onClick={addMessageHandler}>Message</button>
                </div>
            </div>
        </div>
    )
}

export default Dialogs;