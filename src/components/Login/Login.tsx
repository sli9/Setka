import React, {FC} from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, Input} from "../common/FormControls/FormControls";
import {required} from "../../utilits/validators/validators";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../Redux/auth-reducer";
import {AppRootStoreType} from "../../Redux/redux-store";
import {Redirect} from "react-router-dom";
import classes from "../common/FormControls/FormControls.module.css";

type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}
type FormDataKeysType = Extract<keyof FormDataType, string> // 'email', 'password', 'rememberMe'

type FormOwnDataType = { captchaUrl: string | null }


const LoginForm: FC<InjectedFormProps<FormDataType, FormOwnDataType> & FormOwnDataType> = ({
                                                                                               handleSubmit,
                                                                                               error,
                                                                                               captchaUrl
                                                                                           }) => {
    return <form onSubmit={handleSubmit}>

        {/*<div>*/}
        {/*    <Field name={'email'} placeholder={'Email'} component={Input} validate={[required]}/>*/}
        {/*</div>*/}
        {/*<div>*/}
        {/*    <Field name={'password'} placeholder={'Password'} type={'password'} component={Input}*/}
        {/*           validate={[required]}/>*/}
        {/*</div>*/}
        {/*<div>*/}
        {/*    <Field name={'rememberMe'} type="checkbox" component={Input}/>Remember me*/}
        {/*</div>*/}

        {/*using createField helper*/}
        {createField<FormDataKeysType>('Email', 'email', [required], Input)}
        {createField<FormDataKeysType>('Password', 'password', [required], Input, {type: 'password'})}
        {createField<FormDataKeysType>('Password', 'rememberMe', [], Input, {type: 'checkbox'}, 'remember me')}

        {captchaUrl && <img src={captchaUrl} alt={'yps'}/>}
        {captchaUrl && createField<FormDataKeysType>('Symbols from captcha', 'captcha', [required], Input)}

        {error && <div className={classes.groupError}>{error}</div>}
        <div>
            <button>Login</button>
        </div>
    </form>
}

const LoginReduxForm = reduxForm<FormDataType, FormOwnDataType>({form: 'login'})(LoginForm)


export const Login = () => {

    const captchaUrl = useSelector((state: AppRootStoreType) => state.auth.captchaUrl)
    const isAuth = useSelector((state: AppRootStoreType) => state.auth.isAuth)

    const dispatch = useDispatch()

    const onSubmit = (formData: FormDataType) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha))// this login is not the ThunkCreator, it's callback from HOC connect that inside dispatch ThunkCreator login
    }
    if (isAuth) {
        return <Redirect to={'/profile'}/>
    }
    return <div>
        <h1>LOGIN</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
    </div>
}
