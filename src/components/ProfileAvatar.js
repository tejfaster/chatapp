/* eslint-disable arrow-body-style */
import React from 'react'
import { Avatar } from 'rsuite'
import { getnameInitials } from '../misc/helper'

const ProfileAvatar = (props) => {
    const { name, ...avatarProps } = props
    return (
        <Avatar circle {...avatarProps}>{
            getnameInitials(name)
        }</Avatar>
    )
}

export default ProfileAvatar
