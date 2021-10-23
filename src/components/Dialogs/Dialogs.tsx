import React from "react";
import classes from "./Dialogs.module.css"
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {mapDispatchToPropsType, mapStateToPropsType} from "./DialogsContainer";
import DialogsReduxForm, {MessageFormType} from "./Message/DialogsForm";

type DialogsPropsType = mapStateToPropsType & mapDispatchToPropsType

const Dialogs = (props: DialogsPropsType) => {
    let dialogsItem = props.dialogs.map((d, i) => <DialogItem key={i} name={d.name} id={d.id}/>)
    let messagesItem = props.messages.map((message, i) => <Message key={i} message={message.message}/>)

    const addMessageHandler = (value: MessageFormType) => {
        props.AddMessage(value.newMessage)
    }

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItem}>
                {dialogsItem}
            </div>
            <div className={classes.messages}>
                {messagesItem}
                <DialogsReduxForm onSubmit={addMessageHandler}/>
            </div>
        </div>
    )
}


export default Dialogs;