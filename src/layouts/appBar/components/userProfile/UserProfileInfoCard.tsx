import { Stack, Typography } from '@mui/material'
import React from 'react'
import './userProfile.style.scss'
interface UserProfileInfoCardProps {
    user: {name: string, role: string,avatar: string}
}
const UserProfileInfoCard: React.FC<UserProfileInfoCardProps> = ({user}) => {
  return (
    <div className='userProfileInfoCard' >
        <img src={user.avatar} alt={user.name} className='avatar' />
        <div className='userInfo'>
            <Typography className='userInfo-name'>{user.name}</Typography>
            <Typography className='userInfo-role'>{user.role}</Typography>
      </div>
    </div>
  )
}

export default UserProfileInfoCard