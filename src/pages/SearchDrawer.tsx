import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SvgIcon from '../core/components/Icon';
import './style.scss';
const SearchDrawer = () => {
    return (
        <Drawer
           anchor='top'
           open={true}
        >
            <Box className="template-library-search-drawer-main">
                <Box display="flex" alignItems="center">
                <Button startIcon={<SvgIcon component='check' fill='#000' size="18px"/>}></Button>
                </Box>
            </Box>
        </Drawer>
    )
}
export default SearchDrawer;