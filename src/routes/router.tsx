import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import AppShell from '@/layouts/AppShell';
import Home from '@/pages/Home';
import About from '@/pages/About';
import React from 'react';
import { IconsDemo } from '@/component-library/Icons';
import { ComponentLibraryLandingPage } from '@/component-library/LandingPage';

const children: RouteObject[] = [
  { index: true, element: <Home /> },
  { path: 'about', element: <About /> },
];

if (import.meta.env.DEV) {
  // Only add this route in local development
  const ComponentLibrary = React.lazy(() =>
    import('@/component-library').then(module => ({ default: module.ComponentLibrary }))
  );
  children.push({ 
    path: 'component-library', 
    element: <ComponentLibrary />,
    children: [
      {
        index: true,
        element: <ComponentLibraryLandingPage />,
      },
      {
        path: 'icons',
        element: <IconsDemo />,
      }
    ]
  });
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children,
  },
]);

export default router;