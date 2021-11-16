import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Textarea} from "../../common/FormControls/FormControls";
import {maxLengthCreator, required} from "../../../utilits/validators/validators";

export type MessageFormType = {
    newMessage: string
}

const maxLength = maxLengthCreator(100)

const AddMessageForm = (props: InjectedFormProps<MessageFormType>) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} validate={[required, maxLength]} name='newMessage'
                       placeholder='Enter your message'/>
            </div>
            <div>
                <button>Message</button>
            </div>
        </form>
    )
}

const DialogsReduxForm = reduxForm<MessageFormType>({form: 'dialogs'})(AddMessageForm)

export default DialogsReduxForm

