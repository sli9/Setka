import React from "react";
import classes from "./DialogItem.module.css";
import {NavLink} from "react-router-dom";

type DialogItemType = {
    name: string
    id: string
}

const DialogItem = (props: DialogItemType) => {
    return(
        <div className={classes.dialog+' '+classes.active}>
            <NavLink to={"/dialogs/"+ props.id} activeClassName={'active'}>{props.name}</NavLink>
        </div>
    )
}

export default DialogItem;