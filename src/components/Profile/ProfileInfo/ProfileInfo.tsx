import React from 'react';
import classes from './ProfileInfo.module.css'
import {profileType} from "../../../Redux/profile-reducer";
import {Preloader} from "../../common/Preloader";
import ProfileStatus from "./ProfileStatus";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

type PropsType = {
    profile: profileType | null
    status: string
    updateStatus: (status: string) => void
}

const ProfileInfo = (props: PropsType) => {
    if (!props.profile){ //if props.profile === nul || props.profile === undefind
        return <Preloader/>
    }
    return <div className={classes.content}>
        {/*<div className={classes.back}>*/}
        {/*    <img src='https://wallup.net/wp-content/uploads/2019/09/1031441-honda-cbr-1000f-motorcycles-1993.jpg' alt='sorry'/>*/}
        {/*</div>*/}
        <div className={classes.description}>
            <img src={props.profile.photos.large !== null ? props.profile.photos.large : ''} alt='yps'/>
        </div>
        <div>
            <ProfileStatusWithHooks status={props.status} updateUserStatus={props.updateStatus} />
        </div>
    </div>

}

export default ProfileInfo;
