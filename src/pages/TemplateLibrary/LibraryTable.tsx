import { useState } from "react";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import { styled } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import type { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Table from "@/components/Table/Table";
import { demoTableData } from "./tableData";
import SvgIcon from "@/core/components/Icon";
import IconButton from '@/components/IconButton';
import { IconOutlined } from "@/components/Button/Button";
import CommonModal from "@/components/Modal/Modal";
import { renderPreviewPopupRow, renderPreviewHeading } from "@/pages/TemplateLibrary/components/PreviewType";
import { useGetViewPortSize } from "@/utils/getViewPortSize";
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
    border: '1px solid #0A68DB',
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


type LibraryTableProps = {
  showCheckbox: boolean;
  setShowCheckbox: (value: boolean) => void;
  selectedTemplate: any[];
  setSelectedTemplate: (value: any[]) => void;
};

const LibraryTable: React.FC<LibraryTableProps> = ({
  showCheckbox,
  setShowCheckbox,
  selectedTemplate,
  setSelectedTemplate
}) => {
    const [tableActionMenu, setTableActionMenu] = useState<Record<"name" | "created" | "modified", MenuState>>({
        name: { status: false, anchorEl: null },
        created: { status: false, anchorEl: null },
        modified: { status: false, anchorEl: null },
    });
    const [previewModal, setPreviewModal] = useState({status: false, data: ''});
    const [tooltipId, setTooltipId] = useState<number[]>([]);
    const [selectedSort, setSelectedSort] = useState<{[key in keyof typeof tableActionMenu]: string | null}>({
      name: null,
      created: null,
      modified: null,
    });
    const viewportSize = useGetViewPortSize();
    const isDesktop = viewportSize === 'xl' || viewportSize === 'lg';

    const handleRowSelection = (event: React.ChangeEvent<HTMLInputElement>, rowData: any) => {
      let copyRowData = [...selectedTemplate];
      if(!event || event?.target?.checked) {
        copyRowData.push(rowData);
      }
      else {
        copyRowData = copyRowData.filter((item) => item?.template_id !== rowData?.template_id);
      }
      if(copyRowData.length === 0) {
        setShowCheckbox(false);
      }
      else {
        setShowCheckbox(true);
      }
        setSelectedTemplate(copyRowData);
    }

    const isRowSelected = (rowData: any) => {
      return selectedTemplate?.some((item) => item?.template_id === rowData?.template_id);
    }

    const clearRowSelection = () => {
      setSelectedTemplate([]);
      setShowCheckbox(false);
    }

    const handleTooltip = (id: number) => setTooltipId((prev) => prev.includes(id) ? 
      prev.filter((item) => item !== id) : [...prev, id]);

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>, type: keyof typeof tableActionMenu) => {
      event.stopPropagation();
      const isOpen = tableActionMenu[type].status;
      setTableActionMenu({
        name: { status: false, anchorEl: null },
        created: { status: false, anchorEl: null },
        modified: { status: false, anchorEl: null },
        [type]: {
          status: !isOpen,
          anchorEl: isOpen ? null : event.currentTarget,
        },
      });
    };

    const handleMenuClose = (type?: keyof typeof tableActionMenu) => {
      setTableActionMenu({
        name: { status: false, anchorEl: null },
        created: { status: false, anchorEl: null },
        modified: { status: false, anchorEl: null },
      });
    };

    const handleSortSelect = (type: keyof typeof tableActionMenu, item: string) => {
      setSelectedSort((prev) => ({ ...prev, [type]: item }));
    };


    const handlePreviewModalOpen = (cellData: any[]) => {
      setPreviewModal({status: true, data: cellData});
    }

    const renderHeaderWithMenu = (column: any, type: keyof typeof tableActionMenu, menuItems: string[]) => {
      const selected = selectedSort[type];
      const isAscending = selected?.toLowerCase().includes("a → z");

      return (
        <Box display="flex" alignItems="center" gap="6px">
          <Box>{column.columnDef.header}</Box>

          {selected && <Box>
            {isAscending ? <SvgIcon component="arrowDown" size={18} fill="#5C5C5C" /> :
              <SvgIcon component="arrowUp" size={18} fill="#5C5C5C" />}
          </Box>}

          <Box
            height="18px"
            className="cursor-pointer"
            onClick={(e) => handleMenuClick(e, type)}
          >
            {tableActionMenu[type].status ? (
              <SvgIcon component="arrowUpFill" size={20} fill="#5C5C5C" />
            ) : (
              <SvgIcon component="arrowDownFill" size={20} fill="#5C5C5C" />
            )}
          </Box>

          <StyledMenu
            key={`${type}-menu-${tableActionMenu[type].status ? "open" : "closed"}`}
            anchorEl={tableActionMenu[type].anchorEl}
            open={tableActionMenu[type].status}
            onClose={() => handleMenuClose(type)}
          >
            {menuItems.map((item, index) => {
              const isSelected = selected === item;
              return (
                <MenuItem
                  key={index}
                  disableRipple
                  selected={isSelected} 
                  onClick={() => handleSortSelect(type, item)}
                  sx={{
                    color: isSelected ? "#0A68DB" : "#333333",
                    fontWeight: isSelected ? 500 : 400,
                    "&:hover": { backgroundColor: "transparent" },
                    "&.Mui-selected": {
                      backgroundColor: "transparent",
                      color: "#0A68DB",
                    },
                  }}
                >
                  <Box display="flex" alignItems="center" width="100%" justifyContent="space-between">
                    {item}
                    {isSelected && (
                      <SvgIcon
                        component="check"
                        size={20}
                        fill="#0A68DB"
                        style={{ marginLeft: "auto" }}
                      />
                    )}
                  </Box>
                </MenuItem>
              );
            })}
          </StyledMenu>
        </Box>
      );
    };

    const renderTemplateNameHeader = ({ column }: { column: any }) => renderHeaderWithMenu(column, "name", ["Sort A -> Z", "Sort Z -> A"]);
    const renderTemplateCreatedHeader = ({ column }: { column: any }) => renderHeaderWithMenu(column, "created", ["Sort Ascending", "Sort Descending"]);
    const renderTemplateModifiedHeader = ({ column }: { column: any }) => renderHeaderWithMenu(column, "modified", ["Sort Ascending", "Sort Descending"]);

    const renderTemplateIconHeader = ({cell}) => {
      return <Box className="template-checkbox-container no-padding">
        { showCheckbox ?
          <FormControlLabel
              className="form-control-label"
              onChange={clearRowSelection}
              sx={{padding:0, margin:0}}
              control={
                <Checkbox
                  size="small"
                  sx={{
                    '& .MuiSvgIcon-root': { fontSize: 20 },
                      color: '#5C5C5C',
                    '&.Mui-checked': {
                      color: '#0A68DB',
                    },
                  }}
                  indeterminate={showCheckbox}
                />
              }
              label=""
            /> 
          : <Box height="20px"></Box>
        }
      </Box>
    }

    const renderTemplateIconCell = ({cell}) => {
        const data = cell.getValue();
        return (
               <Box className="template-checkbox-container" display='flex'>
                { showCheckbox ?
                    <FormControlLabel
                    className="form-control-label"
                    onChange={(event) => handleRowSelection(event, cell.row.original)}
                        control={
                            <Checkbox
                              size="small"
                              checked={isRowSelected(cell.row.original)}
                              sx={{
                                '& .MuiSvgIcon-root': { fontSize: 20 },
                                  color: '#5C5C5C',
                                '&.Mui-checked': {
                                    color: '#0A68DB',
                                  },
                                }}
                            />
                        }
                        label=""
                    /> :
                    <Box onClick={(event) => handleRowSelection(null, cell.row.original)} className="cursor-pointer">
                      <IconOutlined height="36px" width="16px" sx={{ pointerEvents: 'none' }} startIcon={
                        data?.type === "Checklist" ?
                        <SvgIcon 
                            component="checkedList"
                            size={18}
                            fill="#0A68DB"
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
                }
               </Box>
            )
    }

    const renderTemplateNameCell = ({cell}) => {
        const data = cell.getValue();
        return (
               <Box minWidth="300px" display="flex" alignItems="center" gap="10px" ml="-10px">
                   <Box display="flex" flexDirection="column" gap="6px">
                        <Box className="template-body-text cursor-pointer" onClick={()=>handlePreviewModalOpen(data)}>{data?.name}</Box>
                          {!isDesktop ?
                          <Box display="flex" gap="24px">
                            <Box className="template-body-text"><span className="template-title-text">Type:</span> {data?.type}</Box>
                            <Box className="template-body-text"><span className="template-title-text">Status:</span> {data?.status}</Box>
                          </Box>
                          :""}
                   </Box>
               </Box>
            )
    }

    const renderTemplateCreatedCell = ({cell}) => {
        const data = cell.getValue();
        const templateData = cell.row.original;
        return (
               <Box display="flex" gap="4px" alignItems='center'>
                <Box>{data}</Box>
                <Tooltip 
                  key={templateData.template_id}
                  title={templateData.template_id}
                  arrow
                  slotProps={{
                    tooltip: {
                      sx: {
                        fontSize: "12px",
                        padding: "4px 8px",
                      },
                    },
                  }}
                  PopperProps={{
                    sx: { zIndex: 1000 },
                  }}
                  open={tooltipId.includes(templateData.template_id)}
                  disableFocusListener
                  disableHoverListener
                  disableTouchListener
                >
                  <Box display='flex' className="cursor-pointer" onClick={()=>handleTooltip(templateData?.template_id)}><SvgIcon component="infoCircle" size={18} fill="#5C5C5C"/></Box>
                </Tooltip>
                </Box>
            )
    }

    const renderActionsCell = ({cell}) => {
        return (
            <Box display="flex" alignItems="center">
              <IconButton disableHover={true}><SvgIcon component="send" size={20} fill="#5C5C5C"/></IconButton>
              <IconButton disableHover={true}><SvgIcon component="copy" size={20} fill="#5C5C5C"/></IconButton>
              <IconButton disableHover={true}><SvgIcon component="edit" size={20} fill="#5C5C5C"/></IconButton>
              <IconButton disableHover={true}><SvgIcon component="download" size={20} fill="#5C5C5C"/></IconButton>
              <IconButton disableHover={true}><SvgIcon component="delete" size={20} fill="#F44336"/></IconButton>
            </Box>
        )
    }

    const columns = [
      {
        accessorKey: "template_icon",
        header: "",
        Header: renderTemplateIconHeader,
        Cell: renderTemplateIconCell,
        muiTableHeadCellProps: () => ({className: "template-head-text" }),
        muiTableBodyCellProps: () => ({className: "template-body-text" })
     },
      {
        accessorKey: "template_name",
        header: "Name",
        Header: renderTemplateNameHeader,
        Cell: renderTemplateNameCell,
        muiTableHeadCellProps: () => ({className: "template-head-text" }),
      }]

    const desktopColumns = [
      {
        accessorKey: "template_name.type",
        header: "Type",
        muiTableHeadCellProps: () => ({className: "template-head-text" }),
        muiTableBodyCellProps: () => ({className: "template-body-text" })
      },
      {
        accessorKey: "template_name.status",
        header: "Status",
        muiTableHeadCellProps: () => ({className: "template-head-text" }),
        muiTableBodyCellProps: () => ({className: "template-body-text" })
      }
    ];  

    const columns2 = [{
        accessorKey: "created",
        header: "Created",
        Header: renderTemplateCreatedHeader,
        Cell: renderTemplateCreatedCell,
        muiTableHeadCellProps: () => ({className: "template-head-text" }),
        muiTableBodyCellProps: () => ({className: "template-body-text" })
      },
      {
        accessorKey: "last_modified",
        header: "Last Modified",
        Header: renderTemplateModifiedHeader,
        muiTableHeadCellProps: () => ({className: "template-head-text" }),
        muiTableBodyCellProps: () => ({className: "template-body-text" })
      },
     {
        accessorKey: "actions",
        header: "Actions",
        Cell: renderActionsCell,
        muiTableHeadCellProps: () => ({className: "template-head-text" }),
      },
    ]

    const getColumns = () => {
      //Desktop View
       if (isDesktop) 
          return [...columns, ...desktopColumns, ...columns2];
  
       // Tab View
       return [...columns, ...columns2];
    }

  const templateTableProps = {
    columns: getColumns(),
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
        <div className="template-library-table-container">
            <Table 
                tableProps={templateTableProps}
            />

           {/* Template Preview Popup */}
            <CommonModal
              open={previewModal.status}
              onClose={() => setPreviewModal({status: false, data: ''})}
              title={renderPreviewHeading({
                  heading: "5-S Audit All Departments - 5S Certification Audits",
                  btn1visible: true, 
                  btn1Name: "upload", 
                  btn2visible: true, 
                  btn2Name: "moreOption"
                })
              }
              showActions={false}
            >
              <Box sx={{ borderRadius: "8px", border: "1px solid #DCDCDC"}}>
                <Box sx={{ padding: "16px", backgroundColor: "#F4F5FA", display: "flex", gap: "10px", fontWeight: "500"}}>
                  <Box width="70%">Question</Box>
                  <Box width="30%" ml="30px">Answer</Box>
                </Box>
                {renderPreviewPopupRow({
                  index: "1",
                  text: "Acknowledge that you have reviewed the alert.",
                  type: "",
                  answer: "Confirmed",
                  mandatory: true
                })}
                {renderPreviewPopupRow({
                  index: "2",
                  text: "Select cause",
                  type: "Dropdown",
                  answer: "Select a cause",
                  mandatory: true
                })}
                {renderPreviewPopupRow({
                  index: "3",
                  text: "Select corrective actions",
                  type: "Dropdown",
                  answer: "Select actions",
                  mandatory: true
                })}
                {renderPreviewPopupRow({
                  index: "4",
                  text: "Comments",
                  type: "Multiline-Textfield",
                  answer: "Comments",
                  mandatory: true
                })}
              </Box>
            </CommonModal>
        </div>
    )
}


export default LibraryTable;