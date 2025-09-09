import React, { useState } from 'react';
import DirectoryTree from "@/components/DirectoryTree";
import { Button, Divider, Stack, Typography } from '@mui/material';
import { PrimaryButton } from '@/components/Button/Button';
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";

import LibraryTable from './LibraryTable';
import "./style.scss";
import PageTemplate from '../../components/pageTemplate/PageTemplate';
import SvgIcon from '@/core/components/Icon';
import IconButton from '@/components/IconButton';

const folderData = [
  {
    id: "1",
    name: "Templates",
    children: [
      { id: "2", name: "EG", children: [
        { id: "2-1", name: "Subfolder 1" },
        { id: "2-2", name: "Subfolder 2" },
        { id: "2-3", name: "Subfolder 3" },
      ] },
      { id: "3", name: "GMC" },
      { id: "4", name: "RPI" },
      { id: "5", name: "Standard Templates" },
      { id: "6", name: "VSI" },
      { id: "7", name: "Vallarta Demo Tasks" },
      { id: "8", name: "Deleted Items" },
    ],
  },
  {
    id: "9",
    name: "Report Task",
    children: [
      { id: "91", name: "GMC" },
      { id: "92", name: "RPI" },
      { id: "93", name: "Standard Templates" },
    ],
  },
];

const SearchField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    // fontSize: "12px",
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

    const [searchDrawer, setSearchDrawer] = useState({
        status: false,
        text: "",
    });

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
        <Box display="flex">
            <Box width="20%" fontSize={'19px'} fontWeight={500} padding={"7px 16px"}>Folder Tree</Box>
            
            <Box width="80%" display="flex" alignItems="center">
                <Box fontSize={'19px'} marginRight={'100px'} fontWeight={500} padding={'2px 0px'}>
                    Template Library
                </Box>
                <SearchField
                    className="search-bar"
                    variant="outlined"
                    placeholder="Search by template name"
                    size="small"
                    fullWidth
                    sx={{ width:"500px" }}
                    onClick={openSearchDrawer}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton edge="end">
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                &nbsp; &nbsp;
                <PrimaryButton>Create Template</PrimaryButton>
            </Box>

        </Box>
        <Divider sx={{ marginTop: '4px', borderBottomWidth: 1 }} />

        <Box display="flex" >
            <Box width={'20%'}>
                <DirectoryTree data={folderData} />
            </Box>
            <Box width={"80%"}>
                <LibraryTable />
            </Box>
        </Box>

         <Drawer
            anchor="top"
            open={searchDrawer.status}
            onClose={closeSearchDrawer}
        >
            <Box margin='80px 20px' display='flex' justifyContent='space-between' alignItems='center'>
                <h4>Template Advanced Filter</h4>
            </Box>
        </Drawer>
      </PageTemplate.Content>

          </PageTemplate>
   
    ;
};

export default TemplateLibrary;