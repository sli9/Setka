import React, {ChangeEvent} from 'react';
import classes from './ProfileInfo.module.css'
import {profileType} from "../../../Redux/profile-reducer";
import {Preloader} from "../../common/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import DefaultPhoto from "../../../assets/images/Default_User_Icon.png";

type PropsType = {
    profile: profileType | null
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    saveAva: (ava: File) => void
}

const ProfileInfo = (props: PropsType) => {
    if (!props.profile) { //if props.profile === nul || props.profile === undefind
        return <Preloader/>
    }

    const newAvaHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files !== null && e.target.files.length) {
            props.saveAva(e.target.files[0])
        }
    }
    return <div className={classes.content}>
        {/*<div className={classes.back}>*/}
        {/*    <img src='https://wallup.net/wp-content/uploads/2019/09/1031441-honda-cbr-1000f-motorcycles-1993.jpg' alt='sorry'/>*/}
        {/*</div>*/}
        <div className={classes.description}>
            <img src={props.profile.photos.large || DefaultPhoto} className={classes.ava} alt='yps'/>
        </div>
        {props.isOwner && <input type={'file'} onChange={newAvaHandler}/>}
        <div>
            <ProfileStatusWithHooks status={props.status} updateUserStatus={props.updateStatus}/>
        </div>
    </div>

}

export default ProfileInfo;
