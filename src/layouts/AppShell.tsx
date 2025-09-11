
import { Outlet, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import AppBar from './appBar/AppBar';
import Sidebar from './sidebar/Sidebar';
import { defaultConstants } from '@/core/constants';
import './appshell.style.scss'
import { useEffect, useRef, useState } from 'react';
const topBarHeight = defaultConstants.topBarHeight;

export default function AppShell() {
  const location = useLocation();
  const activePath = location.pathname;
  const [showMenu, setShowMenu] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const handleToggleMenu = () => {
    setShowMenu(!showMenu);
  }

  useEffect(()=>{
    if (sidebarRef.current) {
      if(showMenu) {
        sidebarRef.current.style.width="90px";
        sidebarRef.current.style.paddingRight = "var(--space-lg)";
        sidebarRef.current.style.transition = "width .8s";
      }
      else {
        sidebarRef.current.style.width="0px";
        sidebarRef.current.style.paddingRight = "0px";
        sidebarRef.current.style.transition = "width .8s";
      }
    }
  },[showMenu]);
  return (
    <div className='appShell__container'>
      <AppBar drawerHeight={topBarHeight} handleToggleMenu={handleToggleMenu}/>
      <div className='appShell__sideNavAndbody'>
            <Sidebar activePath={activePath} sidebarRef={sidebarRef}/>
      <main
        className='appShell__body'
      >
        <Outlet />
      </main>
      </div>
    </div>
  );
}