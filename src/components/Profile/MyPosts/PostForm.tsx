import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../validators/validators";
import {Textarea} from "../../common/FormControls/FormControls";

export type PostFormType = {
    newPost: string
}

const maxLength = maxLengthCreator(10)

const PostForm = (props: InjectedFormProps<PostFormType>) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} name='newPost' placeholder='Enter new post'
                       validate={[required, maxLength]}/>
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

const PostReduxForm = reduxForm<PostFormType>({form: 'posts'})(PostForm)

export default PostReduxForm