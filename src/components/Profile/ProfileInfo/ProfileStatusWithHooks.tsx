import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStoreType} from "../../../Redux/redux-store";
import {updateUserStatus} from "../../../Redux/profile-reducer";



const ProfileStatusWithHooks: FC = () => {

    const status = useSelector((state: AppRootStoreType) => state.profilePage.status)

    const [newStatus, setNewStatus] = useState(status)
    const [editMode, setEditMode] = useState(false)

    const dispatch = useDispatch()

    useEffect(()=>{
        setNewStatus(status)
    },[status])

    const activateEditMode = () => {
        setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        dispatch(updateUserStatus(newStatus))
    }
    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewStatus(e.currentTarget.value)
    }
    return (
        <div>
            {!editMode ?
                 <span onDoubleClick={activateEditMode}><b>Status</b>: {status || '-------'}</span> :
                <input type="text" value={newStatus}
                       autoFocus={true} onBlur={deactivateEditMode}
                       onChange={onStatusChange}/>}
        </div>
    )
}


export default ProfileStatusWithHooks;
