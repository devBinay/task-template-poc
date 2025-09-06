import { createBrowserRouter } from 'react-router-dom';
import AppShell from '@/layouts/AppShell';
import Home from '@/pages/Home';
import About from '@/pages/About';
import React from 'react';
import TemplateLibrary from '@/pages/TemplateLibrary';

const children = [
  { index: true, element: <Home /> },
  { path: 'about', element: <About /> },
];

if (import.meta.env.DEV) {
  // Only add this route in local development
  const ComponentLibrary = React.lazy(() =>
    import('@/component-library').then(module => ({ default: module.ComponentLibrary }))
  );
  children.push({ path: 'component-library', element: <ComponentLibrary /> });
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'template-library', element: <TemplateLibrary /> },
    ],
  },
]);

export default router;