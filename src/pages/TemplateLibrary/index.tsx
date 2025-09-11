import React, { useState } from 'react';
import DirectoryTree from "@/components/DirectoryTree";
import { Button, Divider, Stack, Typography } from '@mui/material';
import { PrimaryButton } from '@/components/Button/Button';
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import LibraryTable from './LibraryTable';
import PageTemplate from '../../components/pageTemplate/PageTemplate';
import IconButton from '@/components/IconButton';
import SvgIcon from '@/core/components/Icon';
import { folderTreeData } from './tableData';
import EmptyState from '../../components/EmptyList/EmptyList';
import "./style.scss";
import SearchDrawer from '../SearchDrawer.js';
import TableRowSkeleton from './Component/Skeleton.js';

const SearchField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    fontWeight: "400",
    "& fieldset": {
      border: "1px solid lightgray",
    },
    "&:hover fieldset": {
      border: "1px solid lightgray",
    },
    "&.Mui-focused fieldset": {
      border: "1px solid gray",
    },
  },
}));

const TemplateLibrary: React.FC = () => {

    const [searchDrawer, setSearchDrawer] = useState({status: false, text: ""});
    const [selectedDirectoryId, setSelectedDirectoryId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const openSearchDrawer = () => {
        setSearchDrawer((prev) => ({ ...prev, status: true }));
    };
    const closeSearchDrawer = () => {
        setSearchDrawer((prev) => ({ ...prev, status: false, text: "" }));
    };

    return <PageTemplate>
        <PageTemplate.Header>
        <Stack direction={"row"} alignItems={'center'}>
          <IconButton variant="outline" disableHover={true} sx={{
               marginRight:'var(--space-lg)',
          }}>
          <SvgIcon component={"chevronLeft"} size={"20"}/>
          </IconButton>
          <Typography variant='h2'>
            Template
          </Typography>
        </Stack>
        </PageTemplate.Header>
      <PageTemplate.Content>
      <Box className="template-library-container">
         <Box display="flex" padding={"8px 16px"} alignItems="center">
            <Box width="20%" fontSize={'19px'} fontWeight={500}>Folder Tree</Box>
            
            <Box width="80%" display="flex" alignItems="center" gap='12px' justifyContent={"space-between"} flexGrow={1}>
                <Box fontSize={'19px'} fontWeight={500} whiteSpace="nowrap" mr="16px">
                    Template Library
                </Box>
                <Box flexGrow={1}>
                    <SearchField
                        className="search-bar"
                        variant="outlined"
                        placeholder="Search by template name"
                        size="small"
                        fullWidth
                        onClick={openSearchDrawer}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                  <SvgIcon component="search" size={20} />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>
                <Box whiteSpace="nowrap"><PrimaryButton>Create Template</PrimaryButton></Box>
                <Button 
                  startIcon={
                    <SvgIcon component="upload" size={20} fill="#5C5C5C" />
                  }
                  sx={{ borderColor: '#DCDCDC' }}
                  variant='outlined' 
                  className='more-options-button'
                ></Button>
                <Button 
                  startIcon={
                    <SvgIcon component="moreOption" size={20} fill="#5C5C5C" />
                  }
                  sx={{ borderColor: '#DCDCDC' }}
                  variant='outlined'
                  className='more-options-button'
                ></Button>
            </Box>

        </Box>
        <Divider sx={{ marginTop: '4px', borderBottomWidth: 1 }} />

        <Box display="flex" >
            <Box width={'20%'}>
              <DirectoryTree data={folderTreeData?.data} setSelectedData={setSelectedDirectoryId} />
            </Box>
            <Box width={"80%"}>
              {loading ? [...Array(5)].map((_, i) => (
                <TableRowSkeleton key={i} />
              )) :
              !selectedDirectoryId ?  
                <EmptyState
                  title = "To view task templates, select a folder on the left or search above"
                  description = "Nothing is selected"
                  imageSrcName = "emptyState"
                  imageWidth={90}
                /> :
                <LibraryTable />
              }
            </Box>
        </Box>

        <SearchDrawer
            open={searchDrawer.status}
            onClose={closeSearchDrawer}
        />

       </Box>
      </PageTemplate.Content>

    </PageTemplate>
    ;
};

export default TemplateLibrary;