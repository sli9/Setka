import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utilits/validators/validators";
import {createField, Textarea} from "../../common/FormControls/FormControls";

export type PostFormType = {
    newPost: string
}

const maxLength = maxLengthCreator(10)
type PostFormDataKeysType = Extract<keyof PostFormType, string>

const PostForm = (props: InjectedFormProps<PostFormType>) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {createField<PostFormDataKeysType>('Enter new post', 'newPost', [required, maxLength], Textarea)}
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

const PostReduxForm = reduxForm<PostFormType>({form: 'posts'})(PostForm)

export default PostReduxForm