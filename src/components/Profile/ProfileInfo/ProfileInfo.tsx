import React from 'react';
import classes from './ProfileInfo.module.css'


const ProfileInfo = () => {
    return <div className={classes.content}>
        <div>
            <img
                src='https://www.wallpaperup.com/uploads/wallpapers/2016/11/04/1031441/c1b38f76dbc9a27c74006368de5d45b1-700.jpg'
                alt='yps'/>
        </div>
        <div className={classes.description}>Ava+description</div>
    </div>

}

export default ProfileInfo;
