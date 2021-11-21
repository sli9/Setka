import React, {useState} from "react";
import classes from "./Paginator.module.css";

type paginatorPropsType = {
    totalUsers: number
    pageSize: number
    currentPage: number
    onChangePage: (p: number) => void
    portion: number
}

export const Paginator = (props: paginatorPropsType) => {

    const pagesCount = Math.ceil(props.totalUsers / props.pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    const portionCount = Math.ceil(pagesCount / props.portion)
    const [portionNumber, setPortionNumber] = useState(1)
    const startNumberOfPortoin = (portionNumber - 1) * props.pageSize
    const endNumberOfPortoin = portionNumber * props.pageSize

    return <div className={classes.paginator}>
        {portionNumber>1 &&
        <button onClick={() => {setPortionNumber(portionNumber-1)}}> PREV </button> }
        {pages.filter(p => p >= startNumberOfPortoin && p <= endNumberOfPortoin)
            .map((p, i) => <span key={i} className={props.currentPage === p ? classes.selectedPage : classes.pageNumber}
                                   onClick={() => {
                                       props.onChangePage(p)
                                   }}>{` ${p}`}</span>)}

        {portionCount > portionNumber &&
        <button onClick={() => {setPortionNumber(portionNumber+1)}}> NEXT </button>}
    </div>
}