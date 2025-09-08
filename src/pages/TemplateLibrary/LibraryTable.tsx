import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { styled, alpha } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import type { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Table from "@/components/Table/Table";
import { useCallback, useMemo, useRef, useState } from "react";
import {  type MRT_ColumnDef} from "material-react-table";
import { demoTableData } from "./tableData";
import SvgIcon from "@/core/components/Icon";
import { IconOutlined } from "@/components/Button/Button";
import "./style.scss";

export type TemplateLibrary = {
  template_icon: string;
  template_name: string;
  type: string;
  status: string;
  created: string;
  last_modified: string;
};

type MenuState = {
    status: boolean;
    anchorEl: null | HTMLElement;
};

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'left',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: 'rgb(55, 65, 81)',
    paddingTop: '6px',
    paddingBottom: '6px',
    boxShadow: 'none',
    '& .MuiMenuItem-root': {
        fontSize:'15px',
        fontWeight: 400,
        color: '#333333',
        padding: '4px 12px',
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
        ...theme.applyStyles('dark', {
          color: 'inherit',
        }),
      },
      '&:focus, &:hover, &:active':{
        background: "transparent",
      },
    },
    ...theme.applyStyles('dark', {
      color: theme.palette.grey[300],
    }),
  },
}));


const LibraryTable : React.FC = () => {
    const [tableActionMenu, setTableActionMenu] = useState<Record<"name" | "created" | "modified", MenuState>>({
        name: { status: false, anchorEl: null },
        created: { status: false, anchorEl: null },
        modified: { status: false, anchorEl: null },
    });

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>, type: keyof typeof tableActionMenu) => {
        event.stopPropagation();
        const copyTableActionMenu = { ...tableActionMenu };
        copyTableActionMenu[type] = { status: true, anchorEl: event.currentTarget };
        setTableActionMenu(copyTableActionMenu);
    }

    const handleMenuClose = (type?: keyof typeof tableActionMenu) => {
        setTableActionMenu({
            name: { status: false, anchorEl: null },
            created: { status: false, anchorEl: null },
            modified: { status: false, anchorEl: null }
        });
    }

    const renderHeaderWithMenu = (column: any, type: keyof typeof tableActionMenu, menuItems: string[]) => (
        <Box display="flex" alignItems="center" gap="4px">
            <Box>{column.columnDef.header}</Box>
            <Box height="18px" className="cursor-pointer" onClick={(e) => handleMenuClick(e, type)}>
                <SvgIcon component="arrowDown" size={16} fill="#5C5C5C" />
            </Box>
            <StyledMenu
                key={`${type}-menu-${tableActionMenu[type].status ? 'open' : 'closed'}`}
                anchorEl={tableActionMenu[type].anchorEl}
                open={tableActionMenu[type].status}
                onClose={() => handleMenuClose(type)}
            >
                {menuItems.map((item, index) => (
                    <MenuItem key={index} disableRipple>
                        {item}
                    </MenuItem>
                ))}
            </StyledMenu>
        </Box>
    );

    const renderTemplateNameHeader = ({ column }) => renderHeaderWithMenu(column, "name", ["Sort A -> Z", "Sort Z -> A"]);
    const renderTemplateCreatedHeader = ({ column }) => renderHeaderWithMenu(column, "created", ["Sort Ascending", "Sort Descending"]);
    const renderTemplateModifiedHeader = ({ column }) => renderHeaderWithMenu(column, "modified", ["Sort Ascending", "Sort Descending"]);

    const renderTemplateIconCell = ({cell}) => {
        const data = cell.getValue();
        return (
               <Box>
                    <IconOutlined height="36px" width="16px" sx={{ pointerEvents: 'none' }} startIcon={
                        data?.type === "Checklist" ?
                        <SvgIcon 
                            component="checkedList"
                            size={18}
                            fill="#5C5C5C"
                            sx={{ pointerEvents: 'none' }}
                         /> :
                        <SvgIcon 
                            component="checkedDoc"
                            size={18}
                            fill="#009B00"
                         />
                        }
                        variant='outlined'
                    />
               </Box>
            )
    }

    const renderTemplateNameCell = ({cell}) => {
        const data = cell.getValue();
        return (
               <Box minWidth="400px" display="flex" alignItems="center" gap="10px">
                   <Box display="flex" flexDirection="column" gap="6px">
                        <Box className="template-body-text">{data?.name}</Box>
                          <Box display="flex" gap="24px">
                            <Box className="template-body-text"><span className="template-title-text">Type:</span> {data?.type}</Box>
                            <Box className="template-body-text"><span className="template-title-text">Status:</span> {data?.status}</Box>
                          </Box>
                   </Box>
               </Box>
            )
    }

    const renderActionsCell = ({cell}) => {
        return (
            <Box display="flex" alignItems="center" gap="6px">
                <Box><SvgIcon component="send" size={36} fill="#5C5C5C"/></Box>
                <Box><SvgIcon component="copy" size={36} fill="#5C5C5C"/></Box>
                <Box><SvgIcon component="edit" size={36} fill="#5C5C5C"/></Box>
                <Box><SvgIcon component="delete" size={36} fill="#F44336"/></Box>
            </Box>
        )
    }

    const columns = [
      {
        accessorKey: "template_icon",
        header: "",
        Cell: renderTemplateIconCell,
        muiTableHeadCellProps: () => ({className: "template-head-text" }),
        muiTableBodyCellProps: () => ({className: "template-body-text" })
     },
      {
        accessorKey: "template_name",
        header: "Name",
        Cell: renderTemplateNameCell,
        // Header: renderTemplateNameHeader,
        muiTableHeadCellProps: () => ({className: "template-head-text" }),
      },
      {
        accessorKey: "created",
        header: "Created",
        // Header: renderTemplateCreatedHeader,
        muiTableHeadCellProps: () => ({className: "template-head-text" }),
        muiTableBodyCellProps: () => ({className: "template-body-text" })
      },
      {
        accessorKey: "last_modified",
        header: "Last Modified",
        // Header: renderTemplateModifiedHeader,
        muiTableHeadCellProps: () => ({className: "template-head-text" }),
        muiTableBodyCellProps: () => ({className: "template-body-text" })
      },
     {
        accessorKey: "actions",
        header: "Actions",
        muiTableHeadCellProps: () => ({className: "template-head-text" }),
        Cell: renderActionsCell,
      },
    ]

  const templateTableProps = {
    columns,
    data: demoTableData,
    enableColumnActions: false,
    enableColumnFilters: false,
    enablePagination: false,
    enableSorting: false,
    enableBottomToolbar: false,
    enableTopToolbar: false,
    muiTableBodyRowProps: { hover: false },
    muiTableContainerProps:() => ({className: "template-table-main" }),
  }

    return (
        <div className="template-library-table-main-container">
            <Table 
                tableProps={templateTableProps}
            />
        </div>
    )
}


export default LibraryTable;