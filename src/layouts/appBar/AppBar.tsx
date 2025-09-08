import React from 'react';
import Typography from '@mui/material/Typography';
import { defaultConstants } from '../../core/constants';
import clientLogo from "@assets/Logile Logo.svg"
import { alpha, InputBase, Stack, styled } from '@mui/material';
import Icon from '../../core/components/Icon';
import IconButton from '../../components/IconButton';
import UserProfileInfoCard from './components/userProfile/UserProfileInfoCard';
import navAvatarPng from '../../assets/navbarAvatar.png'
import NavSearchBar from './components/searchBar/SearchBar';
interface AppBarProps {
  drawerHeight: number;
}

const AppBar: React.FC<AppBarProps> = ({ drawerHeight }) => {
  const handleSearch = (value: string) => {
    console.log(value)
  }
  return <Stack component={"header"}
    sx={{ padding: 0, height: drawerHeight, backgroundColor: 'var(--background-secondary)', color: 'var(--text-primary)', position: "unset" }}
  >
    <div style={{ alignItems: "center", display: "flex", justifyContent: "space-between", padding: "0 var(--space-3xl)" }}>
      {/* Logo Section */}
      <Stack direction={"row"} sx={{
        height: "fit-content",
        alignItems: "flex-end"
      }}>

        <img src={clientLogo} />
        <Typography sx={(theme) => ({
          color: theme.palette.primary.main,
          marginLeft: ".5rem",
          fontSize: "1.4rem",
          fontWeight: 800,
          lineHeight: 1,
        })}>
          {defaultConstants.appAbbr}
        </Typography>
      </Stack>

      {/* Search Bar */}
      <Stack sx={{ marginLeft: "auto" }}>
        <NavSearchBar placeholder='Search...' onSearch={handleSearch} iconPosition='left' icon='magnifineGlass' />
      </Stack>
      {/* Icons Section */}
      <Stack sx={{ marginLeft: "var(--space-4xl)", gap: ".5rem", flexDirection: "row" }}>
        <IconButton variant="primary">
          <Icon name="calenderBlank" size={20} />
        </IconButton>
        <IconButton variant="primary">
          <Icon name="taskList" size={20} />
        </IconButton>
        <IconButton variant="primary">
          <Icon name="envelope" size={20} />
        </IconButton>
        <IconButton variant="primary">
          <Icon name="comment" size={20} />
        </IconButton>
        <IconButton variant="primary">
          <Icon name="alertBell" size={20} />
        </IconButton>
      </Stack>
      {/* User Profile Section */}

      <UserProfileInfoCard user={{ name: "Nathaniel Sheetz", role: "Assoc. Vice President", avatar: navAvatarPng }} />

    </div>
  </Stack>
};

export default AppBar;
