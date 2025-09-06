import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import AppBar from './AppBar';
import Sidebar from './Sidebar';
import { defaultConstants } from '../core/constants';
import './AppShell.scss';

const drawerWidth = defaultConstants.sidebarWidth;
const topBarHeight = defaultConstants.topBarHeight;

export default function AppShell() {
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar drawerWidth={drawerWidth} />
      <Sidebar drawerWidth={drawerWidth} topBarHeight={topBarHeight}/>
      <Box
        component="main"
        className='app-shell'
      >
        <Outlet />
      </Box>
    </Box>
  );
}