import React, {ChangeEvent} from "react";
import classes from "./Dialogs.module.css"
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {dialogType, messageType} from "../../Redux/state";

type DialogsPropsType = {
    ChangeMessage: (text: string) => void
    AddMessage: () => void
    dialogs: Array<dialogType>
    messages: Array<messageType>
    newMessageText: string
}

const Dialogs = (props: DialogsPropsType) => {
    let dialogsItem = props.dialogs.map(d => <DialogItem name={d.name} id={d.id}/>)
    let messagesItem = props.messages.map(message => <Message message={message.message}/>)

    const changeTextHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.ChangeMessage(e.currentTarget.value)
    }
    const addMessageHandler = () => {
        props.AddMessage()
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