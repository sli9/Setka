import React, {ChangeEvent, FC, useEffect, useState} from 'react';

type ProfileStatusType = {
    status: string
    updateUserStatus: (status: string) => void
}

const ProfileStatusWithHooks: FC<ProfileStatusType> = ({status, updateUserStatus}) => {
    const [newStatus, setNewStatus] = useState(status)
    const [editMode, setEditMode] = useState(false)

    useEffect(()=>{
        setNewStatus(status)
    },[status])

    const activateEditMode = () => {
        setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        updateUserStatus(newStatus)
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
