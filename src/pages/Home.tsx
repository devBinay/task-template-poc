import React from 'react';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import SvgIcon from '../core/components/Icon';

const Home: React.FC = () => (
  <>
  <Typography variant="h4">Home</Typography>
  <Button startIcon={
    <>
      <SvgIcon component="search" size={18} fill="#888888" />
      <SvgIcon component="check" size={18} fill="#888888" />
      <SvgIcon component="close" size={18} fill="#888888" />
      <SvgIcon component="copy" size={18} fill="#888888" />
      <SvgIcon component="thumbsUp" size={18} fill="#888888" />
    </>
    } variant='outlined'>
  

          Search

  </Button>
  
  </>
);

export default Home;