import React, {ChangeEvent, useState} from 'react';
import classes from './ProfileInfo.module.css'
import {profileType, saveAva, saveProfile} from "../../../Redux/profile-reducer";
import {Preloader} from "../../common/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import DefaultPhoto from "../../../assets/images/Default_User_Icon.png";
import ProfileDataForm from "./ProfileDataForm";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStoreType} from "../../../Redux/redux-store";

type PropsType = {
    isOwner: boolean
}

const ProfileInfo = (props: PropsType) => {

    const profile = useSelector((state: AppRootStoreType) => state.profilePage.profile)

    const [editMode, setEditMode] = useState(false)

    const dispatch = useDispatch()

    if (!profile) { //if props.profile === nul || props.profile === undefind
        return <Preloader/>
    }

    const newAvaHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {//или if (e.target.files?.lenght)
            dispatch(saveAva(e.target.files[0]))
        }
    }

    const onSubmit = (FormData: profileType) => {
        dispatch(saveProfile(FormData))

    }
    return <div className={classes.content}>

        <div className={classes.description}>
            <img src={profile.photos.large || DefaultPhoto} className={classes.ava} alt='yps'/>
        </div>
        {props.isOwner && <input type={'file'} onChange={newAvaHandler}/>}

        <div>
            <ProfileStatusWithHooks />
        </div>

        {editMode ?
            <ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit}/> :
            <ProfileData goToEditMode={()=>{setEditMode(true)}}
                         profile={profile}
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
