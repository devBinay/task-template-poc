import React from 'react';
import Typography from '@mui/material/Typography';
import Icon from '@/core/components/Icon';
import { Button } from '@mui/material';

const Home: React.FC = () => (
  <>
  <Typography variant="h4">Home</Typography>
  <Button startIcon={<Icon name="search" />} variant='outlined' >
  

          Search

  </Button>
  
  </>
);

export default Home;