
import { Outlet, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import AppBar from './appBar/AppBar';
import Sidebar from './sidebar/Sidebar';
import { defaultConstants } from '@/core/constants';
import './appshell.style.scss'
import { useState } from 'react';
const sideDrawerWidth = defaultConstants.sidebarWidth;
const topBarHeight = defaultConstants.topBarHeight;

export default function AppShell() {
  const location = useLocation();
  const activePath = location.pathname;
  const [showMenu, setShowMenu] = useState(true);
  const handleToggleMenu = () => {
    setShowMenu(!showMenu);
  }
  return (
    <div className='appShell__container'>
      <AppBar drawerHeight={topBarHeight} handleToggleMenu={handleToggleMenu}/>
      <div className='appShell__sideNavAndbody'>
        {
          showMenu ? 
          <Box>
            <Sidebar drawerWidth={sideDrawerWidth} activePath={activePath}/>
          </Box>
          :""
        }
      <main
        className='appShell__body'
      >
        <Outlet />
      </main>
      </div>
    </div>
  );
}