import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../core/components/Icon';
import { alpha, ListItemButton, Stack, styled, Typography } from '@mui/material';
import './sidebar.style.scss'
interface SidebarProps {
  drawerWidth: number;
  activePath: string;
}

const menuItems = [
  { text: 'Home', path: '/', icon: 'storeIcon' },
  { text: 'Quick Links', path: '/quickLinks', icon: 'starIcon' },
  { text: 'ESS', path: '/ess', icon: 'exchange' },
  { text: 'Communication', path: '/communication', icon: 'communication' },
  { text: 'Standards', path: '/standards', icon: 'standards' },
  { text: 'Labour Model', path: '/labourModel', icon: 'labourModel' },
  { text: 'Forecast', path: '/forecast', icon: 'forecast' },
  { text: 'Staffing', path: '/staffing', icon: 'staffing' },
  { text: 'Labour Report', path: '/labourReport', icon: 'labourReport' },
  { text: 'Food Safety', path: '/foodSafety', icon: 'foodSafety' },
  { text: 'Queue Management', path: '/queueManagement', icon: 'queueManagement' },
 
]

const StyledListItemButton = styled(ListItemButton,{
  shouldForwardProp: (prop) => prop !== 'activePath',
})<{activePath?: boolean,component?: any,to?: string}>(({ theme,activePath }) => ({
  display:"flex",
  alignItems:"center",
  flexDirection:"column",
  justifyContent:"center",
  padding:"var(--space-md)",
  borderRadius:theme.shape.borderRadius,
  gap:".4rem",
  width:"100%",
  overflow:"hidden",
  whiteSpace:"normal",
  backgroundColor: activePath ? alpha(theme.palette.primary.main,0.1) : "transparent",
  color:activePath ? theme.palette.primary.main : "inherit",
  
  transition:"all .2s ease-in-out",
  "&:hover":{
    cursor:"pointer",
    backgroundColor: alpha(theme.palette.primary.main,0.1),
    color:theme.palette.primary.main,
    },
    "&::before":{
      content:`""`,
      position:"absolute",
      top:"50%",
      borderStartEndRadius:".4rem",
      borderEndEndRadius:".4rem",
      left:0,
      width:"0.3rem",
      height:"3.6rem",
      transform:"translateY(-50%)",
      backgroundColor: activePath ? (theme.palette.primary.main) : "transparent",
    }
}));

const Sidebar: React.FC<SidebarProps> = ({ drawerWidth,activePath }) => (
 <Stack className='sidebar__container' sx={(theme)=>({
  backgroundColor:'var(--background-secondary)',
  width:drawerWidth
 })}>
  <Stack className='sidebar__switch'>
    <Icon name='exchange' size={20} color={'currentColor'}/>
    <Typography sx={()=>({
      textAlign:'center',
      fontSize:"1.4rem",
      fontWeight:800,
      lineHeight:1,
    })}>IMS</Typography>
    </Stack>

    <Stack className='sidebar__list'>
      {menuItems.map((item) => {
        const isActive = activePath === item.path;  
          return <StyledListItemButton component={Link} to={item.path} activePath={isActive}>
            <Icon name={item.icon} size={24} color={isActive ? 'currentColor' : 'inherit'}/>
                <Typography sx={()=>({
                  textAlign:'center',
                  fontSize:"1.2rem",
                  fontWeight:"inherit",
                })}>{item.text}</Typography>
          </StyledListItemButton>
      
      })}
    </Stack>
</Stack>

);

export default Sidebar;