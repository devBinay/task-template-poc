import { buttonPalette } from "./components/button/button.palette";

export function getCssVar(name: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}
  

const lightPalette = {
    mode: 'light' as const,
    base: {
      main: getCssVar('--blue-500'),
    },
    secondary: {
      main: '#9c27b0',
    },
    background: {
      default: '#ffffff',
      secondary: '#F6F6F6'
    },
    text: {
      primary: '#000000',
      secondary: '#333333',
    },
  };
  
  const darkPalette = {
    mode: 'dark' as const,
    base: {
      main: '#90caf9',
    },
    secondary: {
      main: '#ce93d8',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
      secondary: '#1e1e1e',
    },
    text: {
      primary: '#ffffff',
      secondary: '#aaaaaa',
    },
  };
  
  export { lightPalette, darkPalette };
