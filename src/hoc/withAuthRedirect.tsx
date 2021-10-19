import React, {ComponentType} from "react";
import {AppRootStoreType} from "../Redux/redux-store";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

type MapStatePropsType = {
    isAuth: boolean
}
const mapStateToProps = (state: AppRootStoreType): MapStatePropsType => {
    return {
       isAuth: state.auth.isAuth
    }
}


export function withAuthRedirect<T>(Component: ComponentType<T>)  {

    function RedirectComponent(props: MapStatePropsType) {

        let {isAuth, ...restProps} = props
        if (!isAuth) return <Redirect to={'/login'}/>
            return <Component {...restProps as T}/>;
    }

    return connect (mapStateToProps) (RedirectComponent)
}