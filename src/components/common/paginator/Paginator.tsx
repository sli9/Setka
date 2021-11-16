import React from "react";
import classes from "./Paginator.module.css";

type paginatorPropsType = {
    totalUsers: number
    pageSize: number
    currentPage: number
    onChangePage: (p: number) => void
}

export const Paginator = (props: paginatorPropsType) => {

    const pagesCount = Math.ceil(props.totalUsers / props.pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return <div>
        {pages.map((p, i) => <span key={i} className={props.currentPage === p ? classes.selectedPage : ''}
                                   onClick={() => {
                                       props.onChangePage(p)
                                   }}>{` ${p}`}</span>)}
    </div>
}