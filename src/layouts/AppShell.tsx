import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import AppBar from '../components/AppBar';
import Sidebar from '../components/Sidebar';
import { defaultConstants } from '../core/constants';

const drawerWidth = defaultConstants.sidebarWidth;
const topBarHeight = defaultConstants.topBarHeight;

export default function AppShell() {
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar drawerWidth={drawerWidth} />
      <Sidebar drawerWidth={drawerWidth} topBarHeight={topBarHeight}/>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, marginTop: '60px' }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}