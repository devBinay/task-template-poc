
import { Outlet, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import AppBar from './appBar/AppBar';
import Sidebar from './sidebar/Sidebar';
import { defaultConstants } from '../core/constants';
import './AppShell.scss';

import './appshell.style.scss'
const sideDrawerWidth = defaultConstants.sidebarWidth;
const topBarHeight = defaultConstants.topBarHeight;

export default function AppShell() {
  const location = useLocation();
  const activePath = location.pathname;
  return (
    <div className='appShell__container'>
      <AppBar drawerHeight={topBarHeight} />
      <div className='appShell__sideNavAndbody'>
      <Sidebar drawerWidth={sideDrawerWidth} activePath={activePath}/>
      <main
        className='appShell__body'
      >
        <Outlet />
      </main>
      </div>
    </div>
  );
}