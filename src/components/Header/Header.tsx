import React from 'react';
import {NavLink} from 'react-router-dom';
import classes from './Header.module.css'
import {mapStateToPropsType} from "./HeaderContainer";

type HeaderPropsType = mapStateToPropsType

function Header(props: HeaderPropsType) {
    return <header className={classes.header}>
        <img src="https://cdn.logo.com/hotlink-ok/logo-social-sq.png" alt="yps"/>

        <div className={classes.loginBlock}>
            { props.isAuth ? props.login :
                <NavLink to={'/login'}>Login</NavLink>
            }
        </div>
    </header>

}

export default Header;
