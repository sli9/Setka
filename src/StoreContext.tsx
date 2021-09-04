import React from "react";
import {storeType} from "./Redux/state";

type providerType ={
    store: storeType
    children: React.ReactNode
}

const StoreContext = React.createContext({} as storeType)

export const Provider = (props: providerType) => {
    return <StoreContext.Provider value={props.store}>
        {props.children}
        </StoreContext.Provider>
}

export default StoreContext