import React, { useState } from 'react';
import DirectoryTree from "@/components/DirectoryTree";
import { Stack } from '@mui/material';
import { PrimaryButton } from '@/components/Button/Button';
import TextField from "@mui/material/TextField";
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import InputAdornment from "@mui/material/InputAdornment";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import LibraryTable from './LibraryTable';
import PageTemplate from '../../components/pageTemplate/PageTemplate';
import IconButton from '@/components/IconButton';
import SvgIcon from '@/core/components/Icon';
import { folderTreeData } from './tableData';
import EmptyState from '../../components/EmptyList/EmptyList';
import SearchDrawer from '@/pages/SearchDrawer';
import TableRowSkeleton from '@/pages/TemplateLibrary/components/Skeleton';
import "./style.scss";

const SearchField = styled(TextField)(( ) => ({
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
    const [showCheckbox, setShowCheckbox] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState<any[]>([]);

    const openSearchDrawer = () => {
        setSearchDrawer((prev) => ({ ...prev, status: true }));
    };
    const closeSearchDrawer = () => {
        setSearchDrawer((prev) => ({ ...prev, status: false, text: "" }));
    };

    return <PageTemplate>
        <PageTemplate.Header>
        <Stack direction={"row"} alignItems={'center'}>
          <IconButton variant="outline" disableHover={true} disableTouchRipple sx={{
               marginRight:'var(--space-lg)',
               backgroundColor:'var(--bg-default)'
          }}>
          <SvgIcon component={"chevronLeft"} fill='var(--icon-color-secondary)' size={20}/>
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
            { showCheckbox ?
              <Box width="80%" display="flex" justifyContent="space-between" alignItems="center" fontSize={'19px'} fontWeight={500}>
                <Box display="flex" alignItems="center" gap="22px">
                  <Box height="24px" sx={{transform: 'rotate(-90deg)', cursor:'pointer'}}>
                    <SvgIcon component="arrowUp" size={24} fill="#333333" />
                  </Box>
                  <Box fontSize={'19px'} fontWeight={500} whiteSpace="nowrap" mr="16px">
                    {selectedTemplate.length} Selected
                  </Box>
                </Box>  
                <Box display="flex" alignItems="center" gap="12px">  
                  <IconButton variant='outline'>
                    <SvgIcon component="folderInput" size={22} fill="#0A68DB" />
                  </IconButton>
                  <IconButton variant='outline'>
                    <SvgIcon component="delete" size={22} fill="#F44336" />
                  </IconButton>
                </Box>
              </Box> :
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
                <IconButton variant='outline'><SvgIcon component="upload" size={20} /></IconButton>
                <IconButton variant='outline'><SvgIcon component="moreOption" size={20} /></IconButton>
              </Box>
            }
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
                    <LibraryTable 
                      showCheckbox={showCheckbox}
                      setShowCheckbox={setShowCheckbox}
                      setSelectedTemplate={setSelectedTemplate}
                      selectedTemplate={selectedTemplate}
                    />
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