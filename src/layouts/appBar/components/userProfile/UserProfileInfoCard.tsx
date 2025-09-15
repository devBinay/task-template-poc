 
import { Menu, MenuItem, Typography } from '@mui/material'
import React, { useRef, type Ref } from 'react'
import './userProfile.style.scss'
import SvgIcon from '@/core/components/Icon'
interface UserProfileInfoCardProps {
    user: {name: string, role: string,avatar: string}
}
const UserProfileInfoCard: React.FC<UserProfileInfoCardProps> = ({user}) => {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const anchorEl = useRef<undefined | Ref<HTMLDivElement>>(undefined);
  const handleDropdownClick = (event: React.MouseEvent<HTMLDivElement>) => {
    anchorEl.current = event.currentTarget as unknown as Ref<HTMLDivElement>;
    setIsDropdownOpen(!isDropdownOpen);
  };
  const handleClose = () => {
    anchorEl.current = undefined;
    setIsDropdownOpen(false);
  };
  return (
    <div className='userProfileInfoCard' onClick={handleDropdownClick} ref={anchorEl.current}>
        <img src={user.avatar} alt={user.name} className='avatar' />
        <div className='userInfo'>
            <Typography className='userInfo-name'>{user.name}</Typography>
            <Typography className='userInfo-role'>{user.role}</Typography>
      </div>
      <div>
        {
          isDropdownOpen ? (
            <SvgIcon component="arrowUpFill" size={20} fill="#5C5C5C" />
          ) : (
            <SvgIcon component="arrowDownFill" size={20} fill="#5C5C5C" />
          )
        }
          <Menu
        id="basic-menu"
        anchorEl={anchorEl.current as unknown as HTMLElement}
        open={isDropdownOpen}
        onClose={handleClose}
        slotProps={{
          list: {
            'aria-labelledby': 'basic-button',
          },
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
      </div>
    </div>
  )
}
export default UserProfileInfoCard
 