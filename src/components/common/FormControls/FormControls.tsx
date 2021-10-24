import React from "react";
import {WrappedFieldMetaProps, WrappedFieldProps} from "redux-form";
import classes from "./FormControls.module.css"

type FormControlsPropsType = {
  meta: WrappedFieldMetaProps
}

const FormControls: React.FC<FormControlsPropsType> = ({meta: {touched, error}, children}) => {

  const errorCondition = touched && error

  return <div className={classes.formControl+' '+(errorCondition ? classes.error: '')}>
    {children}
    {errorCondition && <span>{error}</span>}
  </div>
}

export const Textarea: React.FC<WrappedFieldProps> = (props) => {
  const {input, meta, ...restProps} = props
  return <FormControls {...props}><input {...input} {...restProps}/></FormControls>
}

export const Input: React.FC<WrappedFieldProps> = (props) => {
  const {input, meta, ...restProps} = props
  return <FormControls {...props}><input {...input} {...restProps}/></FormControls>
}