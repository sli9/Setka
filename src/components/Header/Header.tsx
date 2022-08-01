import React from 'react';
import {NavLink} from 'react-router-dom';
import classes from './Header.module.css'
import {mapDispatchToPropsType, mapStateToPropsType} from "./HeaderContainer";
import {Button} from "antd";

type HeaderPropsType = mapStateToPropsType & mapDispatchToPropsType

function Header(props: HeaderPropsType) {
    return <header className={classes.header}>
        <img src="https://cdn.logo.com/hotlink-ok/logo-social-sq.png" alt="yps"/>

        <div className={classes.loginBlock}>
            {props.isAuth ? <div>{props.login} - <Button size={"small"} type="primary" onClick={props.logout}>Log out</Button></div> :
                <NavLink to={'/login'}>Login</NavLink>
            }
        </div>
    </header>

}

export default Header;
