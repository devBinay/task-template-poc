import { createBrowserRouter } from 'react-router-dom';
import AppShell from '../layouts/AppShell';
import Home from '../pages/Home';
import About from '../pages/About';
import NoPageFound from '../pages/NoPageFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
 
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: '*', element: <NoPageFound /> },
    ],
  },
]);

export default router;