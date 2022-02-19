import React, {ChangeEvent, useState} from 'react';
import classes from './ProfileInfo.module.css'
import {profileType} from "../../../Redux/profile-reducer";
import {Preloader} from "../../common/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import DefaultPhoto from "../../../assets/images/Default_User_Icon.png";
import ProfileDataForm from "./ProfileDataForm";

type PropsType = {
    profile: profileType | null
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    saveAva: (ava: File) => void
    saveProfile: (profile: profileType) => void
}

const ProfileInfo = (props: PropsType) => {
    const [editMode, setEditMode] = useState(false)

    if (!props.profile) { //if props.profile === nul || props.profile === undefind
        return <Preloader/>
    }

    const newAvaHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files !== null && e.target.files.length) {//или if (e.target.files?.lenght)
            props.saveAva(e.target.files[0])
        }
    }

    const onSubmit = (FormData: profileType) => {
        props.saveProfile(FormData)

    }
    return <div className={classes.content}>

        <div className={classes.description}>
            <img src={props.profile.photos.large || DefaultPhoto} className={classes.ava} alt='yps'/>
        </div>
        {props.isOwner && <input type={'file'} onChange={newAvaHandler}/>}

        <div>
            <ProfileStatusWithHooks status={props.status} updateUserStatus={props.updateStatus}/>
        </div>

        {editMode ?
            <ProfileDataForm initialValues={props.profile} profile={props.profile} onSubmit={onSubmit}/> :
            <ProfileData goToEditMode={()=>{setEditMode(true)}}
                         profile={props.profile}
                         isOwner={props.isOwner}/>}
    </div>
}

type ProfileDataType = {
    profile: profileType
    goToEditMode: () => void
    isOwner: boolean
}

const ProfileData: React.FC<ProfileDataType> = ({goToEditMode, profile, isOwner}) => {
    return <div>
        {isOwner && <button onClick={goToEditMode}>Edit</button>}
        <div>
            <b>Full name</b>: {profile.fullName && profile.fullName}
        </div>
        <div>
            <b>Looking for a job</b>: {profile.lookingForAJob ? 'Yes' : 'Nope'}
            {profile.lookingForAJob && <div><b>My professional skills</b>:{profile.lookingForAJobDescription}</div>}
        </div>
        <div>
            <b>About me</b>: {profile.aboutMe}
        </div>
        <div>
            <b>Contacts</b>: {Object.entries(profile.contacts).map(key => {
            return <Contact key={key[0]} contactTitle={key[0]} contactValue={key[1]}/>
        })}
        </div>
    </div>
}

type ContactType = {
    contactTitle: string
    contactValue: string | null
}

export const Contact: React.FC<ContactType> = ({contactTitle, contactValue}) => {
    return <div className={classes.contacts}><b>{contactTitle}</b>: <b>{contactValue}</b></div>
}

export default ProfileInfo;
