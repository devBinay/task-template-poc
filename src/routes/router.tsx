import { createBrowserRouter } from 'react-router-dom';
import AppShell from '@/layouts/app-shell/AppShell';
import { IconsDemo } from '@/dev-playbook/Icons';
import { ComponentLibraryLandingPage } from '@/dev-playbook/LandingPage';
import NoPageFound from '@/pages/NoPageFound';
import TemplateLibrary from '@/pages/template-library';


const getDevRoutes = ()=>{
if(import.meta.env.DEV){
    return { 
      path: '/dev', 
      element: <AppShell />,
      children: [
        {
          index: true,
          element: <ComponentLibraryLandingPage />,
        },
        {
          path: '/dev/component-library/icons',
          element: <IconsDemo />,
        }
      ]
    }
}
return {}
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <TemplateLibrary /> },
       { path: '*', element: <NoPageFound /> }
    ],
  },
 getDevRoutes()
]);


export default router;