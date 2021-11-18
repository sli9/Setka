import React, {FC} from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../common/FormControls/FormControls";
import {required} from "../../utilits/validators/validators";
import {connect} from "react-redux";
import {login} from "../../Redux/auth-reducer";
import {AppRootStoreType} from "../../Redux/redux-store";
import {Redirect} from "react-router-dom";
import classes from "../common/FormControls/FormControls.module.css";

type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
}

const LoginForm: FC<InjectedFormProps<FormDataType>> = ({handleSubmit, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field name={'email'} placeholder={'Email'} component={Input} validate={[required]}/>
            </div>
            <div>
                <Field name={'password'}  placeholder={'Password'} type={'password'} component={Input} validate={[required]}/>
            </div>
            <div>
                <Field name={'rememberMe'} type="checkbox" component={Input}/>Remember me
            </div>
            {error &&
            <div className={classes.groupError}>
                {error}
            </div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<FormDataType>({form: 'login'})(LoginForm)



const Login = (props: MapDispatchType & MapStateType) => {
    const onSubmit = (formData: FormDataType) => {
        props.login(formData.email, formData.password, formData.rememberMe)// this login is not the ThunkCreator, it's callback from HOC connect that inside dispatch ThunkCreator login
    }
    if (props.isAuth) {return <Redirect to={'/profile'}/>}
    return <div>
        <h1>LOGIN</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}

type MapDispatchType = {
    login: (email: string, password: string, rememberMe: boolean) => void
}
type MapStateType = {
    isAuth: boolean
}
const mapStateToProps = (state: AppRootStoreType) => {
    return {
        isAuth: state.auth.isAuth
    }
}
export default connect(mapStateToProps, {login})(Login)