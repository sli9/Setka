import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";

export type MessageFormType = {
    newMessage: string
}

const AddMessageForm = (props: InjectedFormProps<MessageFormType>) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component='textarea' name='newMessage' placeholder='Enter your message' />
            </div>
            <div>
                <button>Message</button>
            </div>
        </form>
    )
}

const DialogsReduxForm = reduxForm<MessageFormType>({form: 'dialogs'})(AddMessageForm)

export default DialogsReduxForm

