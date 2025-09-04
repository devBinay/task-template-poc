import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './routes/router';
import App from './App';
import { ThemeProvider } from './theme/mui/ThemeProvider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
    <App/>
    </ThemeProvider>
  </React.StrictMode>
);
