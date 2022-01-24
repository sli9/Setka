import React from "react";
import {Field, WrappedFieldMetaProps, WrappedFieldProps} from "redux-form";
import classes from "./FormControls.module.css"
import {FieldValidatorType} from "../../../utilits/validators/validators";

type FormControlsPropsType = {
    meta: WrappedFieldMetaProps
}

const FormControls: React.FC<FormControlsPropsType> = ({
                                                           meta: {touched, error},
                                                           children
                                                       }) => {

    const errorCondition = touched && error

    return <div className={classes.formControl + ' ' + (errorCondition ? classes.error : '')}>
        {children}
        {errorCondition && <span>{error}</span>}
    </div>
}

export const Textarea: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props
    return <FormControls {...props}><textarea {...input} {...restProps}/></FormControls>
}

export const Input: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props
    return <FormControls {...props}><input {...input} {...restProps}/></FormControls>
}

export function createField<FormKeys extends string>(placeholder: string,
                                                     name: FormKeys,
                                                     validators: Array<FieldValidatorType>,
                                                     component: React.FC<WrappedFieldProps>,
                                                     props = {},
                                                     text = '') {

    return <div>
        <Field placeholder={placeholder}
               name={name}
               validate={validators}
               component={component}
               {...props}
        /> {text}
    </div>
}