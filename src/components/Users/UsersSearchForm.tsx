import {Field, Form, Formik} from "formik";
import React from "react";
import {UsersSearchFormType} from "../../Redux/users-reducer";

const usersSearchValidate = () => {
    const errors = {};
    return errors;
}
type SearchFormPropsType = {
    onFilterChanged: (filter: UsersSearchFormType) => void
}
export type FilterType = {
    term: string
    friend: 'true' | 'false' | 'null'
}

export const UsersSearchForm = React.memo((props: SearchFormPropsType) => {

    const submit = (values: FilterType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
        const filter: UsersSearchFormType = {
            term: values.term,
            friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false
        }
        props.onFilterChanged(filter)
        setSubmitting(false)
    }

    return <div>
        <Formik
            initialValues={{term: '', friend: 'null'}}
            validate={usersSearchValidate}
            onSubmit={submit}
        >
            {({isSubmitting}) => (
                <Form>
                    <Field type="text" name="term"/>
                    <Field name="friend" as="select">
                        <option value="null">All</option>
                        <option value="true">Followed</option>
                        <option value="false">Unfollowed</option>
                    </Field>
                    <button type="submit" disabled={isSubmitting}>
                        Find
                    </button>
                </Form>
            )}
        </Formik>
    </div>
})