import React from 'react';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { defaultConstants } from '../core/constants';

interface AppBarProps {
  drawerWidth: number;
}

const topBarHeight = defaultConstants.topBarHeight;

const AppBar: React.FC<AppBarProps> = ({ drawerWidth }) => (
  <MuiAppBar
    position="fixed"
    sx={{ height: topBarHeight }}
  >
    <Toolbar>
      <Typography variant="h6" noWrap>
        My App
      </Typography>
    </Toolbar>
  </MuiAppBar>
);

export default AppBar;
