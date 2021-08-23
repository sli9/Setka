import React from "react";
import classes from "./Dialogs.module.css"
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {dialogType, messageType} from "../../Redux/state";

type DialogsPropsType = {
    dialogs: Array<dialogType>
    messages: Array<messageType>
}

const Dialogs = (props: DialogsPropsType) => {
    let dialogsItem = props.dialogs.map(d => <DialogItem name={d.name} id={d.id}/>)
    let messagesItem = props.messages.map(message => <Message message={message.message}/>)

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItem}>
                {dialogsItem}
            </div>
            <div className={classes.messages}>
                {messagesItem}
            </div>
        </div>
    )
}

export default Dialogs;