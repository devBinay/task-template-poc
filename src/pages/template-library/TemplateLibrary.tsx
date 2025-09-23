import React, { useEffect, useState } from 'react';
import { Button, Stack } from '@mui/material';
import TextField from "@mui/material/TextField";
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import InputAdornment from "@mui/material/InputAdornment";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import LibraryTable from './TemplateTable';
import PageTemplate from '../../layouts/PageTemplate';
import IconButton from '@/core/components/button/IconButton';
import SvgIcon from '@/core/components/icon/Icon';
import NoDataTemplate from '../../core/components/no-data-template/NoDataTemplate';
import SearchDrawer from '@/pages/template-library/components/search-drawer/SearchDrawer';
import "./TemplateStyle.scss";
import { getAllDirectories, getReportsByReportType, getTemplatesByTagId } from './services/template-library.service';
import type { DirectoryType, TemplateType } from './types/template-library.type';
import TreeView from '@/core/components/tree-view/TreeView';
import { folderTreeData } from './tableData';
import { templateSkelton } from './components/skeleton/Skeleton';
import { useGetAllDirectories, useGetTemplatesByTagId } from './services/template-library-api-hooks';

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

const PAGE_SIZE = 10;
const TemplateLibrary: React.FC = () => {

    const [searchDrawer, setSearchDrawer] = useState({status: false, text: ""});
    const [selectedDirectory, setSelectedDirectory] = useState<string | null>(null);
    const [loading, setLoading] = useState({
      directory:false,
      templates: false,
      reports: false,
    });
    const [showCheckbox, setShowCheckbox] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState<any[]>([]);
    // const [directoryData, setDirectoryData] = useState<DirectoryType[]>();
    // const [selectedDirectoryData, setSelectedDirectoryData] = useState<TemplateType>();
    const [paginationData, setPaginationData] = useState<any>({
            currentPage: 1,
            pageSize: PAGE_SIZE,
    });
    const { data: directoriesList, isLoading: isDirectoriesLoading, error: directoriesError } = useGetAllDirectories();
    const { data: templatesList, isLoading: isTemplatesLoading, error: templatesError} = useGetTemplatesByTagId(selectedDirectory?.tagId, paginationData);
    const { data: reportsList, isLoading: isReportsLoading, error: reportsError} = useGetTemplatesByTagId(selectedDirectory?.reportType, paginationData);
    const { renderDirectorySkelton } = templateSkelton;

    const openSearchDrawer = () => {
        setSearchDrawer((prev) => ({ ...prev, status: true }));
    };
    const closeSearchDrawer = () => {
        setSearchDrawer((prev) => ({ ...prev, status: false, text: "" }));
    };

    const handleDirectoryClick = (event:  React.MouseEvent<HTMLElement>, directory:any) => {
      event?.preventDefault();
      event?.stopPropagation();
      setSelectedDirectory(directory);
    }

    return <PageTemplate>
        <PageTemplate.Header>
        <Stack direction={"row"} alignItems={'center'}>
          <IconButton variant="outline" disableHover={true} disableTouchRipple sx={{
               marginRight:'var(--space-lg)',
               backgroundColor:'var(--bg-container-1)',
               padding:'.8rem'
          }}>
          <SvgIcon component={"chevronLeft"} fill='var(--icon-color-secondary)' size={18}/>
          </IconButton>
          <Typography variant='h2'>Template</Typography>
        </Stack>
        </PageTemplate.Header>
      <PageTemplate.Content>
      <Box className="template-library-container">
         <Box display="flex"  alignItems="center" className='template-library__header'>
            <Box width="19.2%" fontSize={'19px'} fontWeight={500}>Folder Tree</Box>
            { selectedTemplate.length > 0 ?
              <Box width="80%" height="36px" display="flex" justifyContent="space-between" alignItems="center" fontSize={'19px'} fontWeight={500}>
                <Box display="flex" alignItems="center" gap="1rem">
                  <Box height="24px" sx={{transform: 'rotate(-90deg)', cursor:'pointer'}} >
                  <IconButton variant='primary' disableHover disableRipple disableTouchRipple sx={{padding:0, minWidth:0}} onClick={() => setSelectedTemplate([])}>
                    <SvgIcon component="arrowUp" size={24} fill="#333333" />
                  </IconButton>
                  </Box>
                  <Box fontSize={'19px'} fontWeight={500} whiteSpace="nowrap" mr="1px">
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
              <Box width="80%" height="36px" display="flex" alignItems="center" gap='12px' justifyContent={"space-between"} flexGrow={1}>
                <Box fontSize={'19px'} fontWeight={500} whiteSpace="nowrap" mr="16px">
                    Template Library
                </Box>
                <Box sx={{
                  maxWidth:"50.5rem",
                  flexGrow:1,
                }}>
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
                <Stack direction={"row"} alignItems="center" gap="12px">
                <Box whiteSpace="nowrap"><Button variant="primary-filled">Create Template</Button></Box>
                <IconButton variant='outline'><SvgIcon component="upload" size={20} /></IconButton>
                <IconButton variant='outline'><SvgIcon component="moreOption" size={20} /></IconButton>
                </Stack>
              </Box>
            }
        </Box>
        <Divider sx={{ borderBottomWidth: 1}} />

        <Box display="flex"  overflow={'auto'} >
            <Box width={'20%'}>
              {/* {  TODO : TO BE REMOVED WHEN BE IS WORKING FINE
                isDirectoriesLoading ? renderDirectorySkelton() :
                <TreeView data={directoriesList?.data || []} handleClick={handleDirectoryClick} />
              } */}
              <TreeView data={folderTreeData?.data || []} handleClick={handleDirectoryClick} />
            </Box>
            <Box width={"80%"} borderLeft={"1px solid var(--gray-200)"}>
              {/* TODO : TO BE REMOVED WHEN BE IS WORKING FINE
              {!isTemplatesLoading && !isReportsLoading  && (!templatesList?.data || templatesList?.data?.length == 0) ?  
                    <NoDataTemplate
                        title = "To view task templates, select a folder on the left or search above"
                        description = "Nothing is selected"
                        imageSrcName = "emptyState"
                        imageWidth={90}
                    /> : */}
                    <LibraryTable 
                      showCheckbox={showCheckbox}
                      setShowCheckbox={setShowCheckbox}
                      setSelectedTemplate={setSelectedTemplate}
                      selectedTemplate={selectedTemplate}
                      templatesList={templatesList}
                      isDataLoading={isTemplatesLoading || isReportsLoading}
                    />
                {/* } */}
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