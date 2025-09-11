import React from 'react';
import Typography from '@mui/material/Typography';
import { defaultConstants } from '@/core/constants';
import clientLogo from "@/assets/Logile Logo.svg"
import { Box, Button, Stack } from '@mui/material';
import IconButton from '@/components/IconButton';
import UserProfileInfoCard from './components/userProfile/UserProfileInfoCard';
import navAvatarPng from '@/assets/navbarAvatar.png'
import NavSearchBar from './components/searchBar/SearchBar';
import SvgIcon from '@/core/components/Icon';
import { styled } from "@mui/material/styles";
interface AppBarProps {
  drawerHeight: number;
}

const MainMenu = styled(Button)(() => ({
  '&.MuiButton-root': {
    minWidth: 'auto',
    padding: '6px 8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // border:'1px solid gray',
  },
  '.MuiButton-startIcon' : {
    margin: 0,
  }
}));

const AppBar: React.FC<AppBarProps> = ({ drawerHeight, handleToggleMenu }) => {
  const handleSearch = (value: string) => {
    console.log(value)
  }
  return <Stack component={"header"}
    sx={{ padding: 0, height: drawerHeight, backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)', position: "unset" }}
  >
    <div style={{ alignItems: "center", display: "flex", justifyContent: "space-between", padding: "var(--space-xs) var(--space-3xl)" }}>
      {/* Logo Section */}
      <Stack direction={"row"} sx={{
        height: "fit-content",
        alignItems: "flex-end"
      }}>
        <Box display="flex" alignItems="center" gap="33px">
        <Box>
          <MainMenu onClick={handleToggleMenu} startIcon={
            <SvgIcon component="hamburger" size={24} />
          }>

          </MainMenu>
        </Box>
        <Box><img src={clientLogo} /></Box>
        </Box>
        <Typography sx={(theme) => ({
          color: theme.palette.primary.main,
          marginLeft: ".8rem",
          fontSize: "1.5rem",
          fontWeight: 500,
          lineHeight: '2rem',
          
        })}>
          {defaultConstants.appAbbr}
        </Typography>
      </Stack>

      {/* Search Bar */}
      <Stack sx={{ marginLeft: "auto", maxWidth:"24rem", maxHeight:"3.6rem" }}>
        <NavSearchBar placeholder='Search...' onSearch={handleSearch} iconPosition='left' icon='search' />
      </Stack>
      {/* Icons Section */}
      <Stack sx={{ marginLeft: "var(--space-4xl)", gap: "var(--space-xs)", flexDirection: "row" }}>
        <IconButton variant="primary" style={{
          padding:"1rem"
        }}>
          <SvgIcon component="calendarBlank" fill={"var(--icon-color-secondary)"} size={20}  />
        </IconButton>
        <IconButton variant="primary" style={{
          padding:"1rem"
        }}>
          <SvgIcon component="clipboardToDo" fill={"var(--icon-color-secondary)"} size={20} />
        </IconButton>
        <IconButton variant="primary" style={{
          padding:"1rem"
        }}>
          <SvgIcon component="envelope" fill={"var(--icon-color-secondary)"} size={20} />
        </IconButton>
        <IconButton variant="primary"  style={{
          padding:"1rem"
        }}>
          <SvgIcon component="comment" fill={"var(--icon-color-secondary)"} size={20} />
        </IconButton>
        <IconButton variant="primary" style={{
          padding:"1rem",
          
        }}>
          <SvgIcon component="notification" fill={"var(--icon-color-secondary)"} size={20} />
        </IconButton>
      </Stack>
      {/* User Profile Section */}

      <UserProfileInfoCard user={{ name: "Nathaniel Sheetz", role: "Assoc. Vice President", avatar: navAvatarPng }} />

    </div>
  </Stack>
};

export default AppBar;
