// theme/theme.ts

import { createTheme } from '@mui/material/styles';
import typography from './typography';
import { lightPalette, darkPalette } from './palette';

export const getTheme = (mode: 'light' | 'dark') =>
  createTheme({
    palette: mode === 'light' ? lightPalette : darkPalette,
    typography,
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
          },
        },
      },
    },
  });
