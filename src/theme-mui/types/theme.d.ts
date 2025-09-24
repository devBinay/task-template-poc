
import  '@mui/material/styles';
import '@mui/material/Button';

declare module '@mui/material/styles' {
  interface Theme {
    custom: {
      sidebarWidth: number;
      borderRadiusSm: string;
    };
  }

  interface ThemeOptions {
    custom?: {
      sidebarWidth?: number;
      borderRadiusSm?: string;
    };
  }

  interface ThemeContextType {
    toggleColorMode: () => void;
    mode: ThemeMode;
  }
}

// Buttons
declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    "primary-filled": true;
    "icon-outlined": true;
  }
}