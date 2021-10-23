import React from "react";
import  {Field, InjectedFormProps, reduxForm} from "redux-form";

export type PostFormType = {
    newPost: string
}

const PostForm = (props: InjectedFormProps<PostFormType>) => {
  return(
      <form onSubmit={props.handleSubmit}>
          <div>
              <Field component='textarea' name='newPost' placeholder='Enter new post'/>
          </div>
          <div>
              <button>Add post</button>
          </div>
      </form>
  )
}

const PostReduxForm = reduxForm<PostFormType>({form: 'posts'})(PostForm)

export default PostReduxForm