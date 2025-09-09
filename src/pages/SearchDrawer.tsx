import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SvgIcon from '../core/components/Icon';
import Searchbar from './TemplateLibrary/Searchbar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { styled } from "@mui/material/styles";
import './style.scss';
import { Divider, TextField, Typography } from '@mui/material';
import { TEMPLATE_SEARCH_TABS } from './constant';
import { useState } from 'react';
import { PrimaryButton } from '../components/Button/Button';

interface TabPanelProps {
  children?: React.ReactNode;
  value: Boolean;
}
const StyledDrawer = styled(Drawer)(({ theme }) => ({
    '& .MuiDrawer-paper': {
      borderBottomLeftRadius:"8px",
      borderBottomRightRadius: "8px",
    }
}))

const StyledTabs = styled(Tabs)(({ theme }) => ({
    borderBottom: '1px solid #DCDCDC',
    minHeight: 'auto',
    '& .MuiButtonBase-root': {
        padding:"4px 12px",
        minHeight:"auto",
        textTransform:'capitalize',
        fontSize:'15px',
        fontWeight:400,
        color:'#5C5C5C',
    }
}))

function TabPanel(props: TabPanelProps) {
  const { children, value } = props;

  return (
    <div>
      {value && <Box>{children}</Box>}
    </div>
  );
}
const SearchDrawer = () => {
    const {RECENT, ADVANCE} = TEMPLATE_SEARCH_TABS;
    const [currentTab, setCurrentTab] = useState(ADVANCE.value);
    const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
        setCurrentTab(newValue);
    }
    return (
        <StyledDrawer
           anchor='top'
           open={true}
        >
            <Box className="template-library-search-drawer-main">
                <Box display="flex" alignItems="center" padding="12px 12px 4px 12px">
                    <Button className='back-btn' startIcon={<SvgIcon component='chevronLeft' fill='#000' size="24px"/>}></Button>
                    <Searchbar/>
                </Box>
                <Divider color='#DCDCDC'/>
                <Box className="tab-container">
                    <StyledTabs onChange={handleTabChange} value={currentTab}>
                        <Tab label={RECENT.label} value={RECENT.value}/>
                        <Tab label={ADVANCE.label} value={ADVANCE.value} />
                    </StyledTabs>
                    <TabPanel value={currentTab === RECENT.value}>
                        <Box className="recent-tab-content">
                            <Box className="recent-search-main">
                                <Box className="recent-search-item">
                                    <Box height="24px">
                                        <SvgIcon component='history' size={24} fill='#5C5C5C' />
                                    </Box>
                                    <Box>
                                        <Typography className='template-name'>Bakery Cleaning <span className='template-code'>(TT-59141)</span></Typography>
                                        <Typography className='template-code'>EG &gt; 5S Audits &gt; 5S Simplicity Leads</Typography>
                                    </Box>
                                </Box>
                                <Typography className='template-code'>
                                    Last Modified: <span className='black-fg'>12/01/2022</span>
                                </Typography>
                            </Box>

                             <Box className="recent-search-main">
                                <Box className="recent-search-item">
                                    <Box height="24px">
                                        <SvgIcon component='history' size={24} fill='#5C5C5C' />
                                    </Box>
                                    <Box>
                                        <Typography className='template-name'>Bakery Annual Safety Training 2021 <span className='template-code'>(TT-59142)</span></Typography>
                                        <Typography className='template-code'>EG &gt; 5S Audits &gt; 5S Simplicity Leads</Typography>
                                    </Box>
                                </Box>
                                <Typography className='template-code'>
                                    Last Modified: <span className='black-fg'>11/29/2022</span>
                                </Typography>
                            </Box>
                        </Box>
                    </TabPanel>
                    <TabPanel value={currentTab === ADVANCE.value}>
                        <Box className="advance-tab-content">
                            <Box className="advance-search-group-1">
                                <Box width="100%">
                                    <Typography className='text-label'>Question Text</Typography>
                                    <TextField className='text-field-input' fullWidth variant='outlined'/>
                                </Box>
                            </Box>
                            <Box>

                            </Box>
                            <Box>
                                <PrimaryButton sx={{width:"87px"}}>Search</PrimaryButton>
                            </Box>
                        </Box>
                    </TabPanel>
                </Box>
            </Box>
        </StyledDrawer>
    )
}
export default SearchDrawer;