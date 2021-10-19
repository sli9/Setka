import React from 'react';

type ProfileStatusType = {
    status: string
}

class ProfileStatus extends React.Component<ProfileStatusType> {

    state = {
        editMode: false
    }

    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    }
    deactivateEditMode = () => {
        this.setState({
            editMode: false
        })
    }

    render() {
        return (
            <div>
                {!this.state.editMode ? <span onDoubleClick={this.activateEditMode}>{this.props.status}</span> :
                    <input type="text" value={this.props.status} autoFocus={true} onBlur={this.deactivateEditMode}/>}
            </div>
        )
    }
}

export default ProfileStatus;
