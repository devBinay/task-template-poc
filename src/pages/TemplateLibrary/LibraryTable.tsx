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
import type { TemplateLibraryTableRowType } from "./types";
import type { MRT_Cell, MRT_Column } from "material-react-table";
import { formatDate } from "@/pages/TemplateLibrary/components/DateFormat";
import type { IconName } from "@/core/types/icon.type";
import { TEMPLATE_SORTING } from "../constant";

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
  selectedTemplate: TemplateLibraryTableRowType[];
  setSelectedTemplate: (value: TemplateLibraryTableRowType[]) => void;
  hoveredRowId?: string | null;
  setHoveredRowId?: (value: string | null) => void;
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
    const [previewModal, setPreviewModal] = useState<{status: boolean, data: TemplateLibraryTableRowType | null}>({status: false, data: null});
    const [tooltipId, setTooltipId] = useState<number | null>(null);
    const [selectedSort, setSelectedSort] = useState<{[key in keyof typeof tableActionMenu]: string | null}>({
      name: null,
      created: null,
      modified: null,
    });
    const viewportSize = useGetViewPortSize();
    const isDesktop = viewportSize === 'xl' || viewportSize === 'lg';

    const handleRowSelection = (checked:boolean, rowData: TemplateLibraryTableRowType) => {
      let copyRowData = [...selectedTemplate];
      if(checked) {
        copyRowData.push(rowData);
      }
      else {
        copyRowData = copyRowData.filter((item) => item?.templateId !== rowData?.templateId);
      }
      if(copyRowData.length === 0) {
        setShowCheckbox(false);
      }
      else {
        setShowCheckbox(true);
      }
        setSelectedTemplate(copyRowData);
    }

    const isRowSelected = (rowData: TemplateLibraryTableRowType) => {
      return selectedTemplate?.some((item) => item?.templateId === rowData?.templateId);
    }

    const clearRowSelection = () => {
      setSelectedTemplate([]);
      setShowCheckbox(false);
    }

    const handleTooltip = (id: number) => setTooltipId((prev) => (prev === id ? null : id));

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

    const handleMenuClose = () => {
      setTableActionMenu({
        name: { status: false, anchorEl: null },
        created: { status: false, anchorEl: null },
        modified: { status: false, anchorEl: null },
      });
    };

    const handleSortSelect = (type: keyof typeof tableActionMenu, item: string) => {
      setSelectedSort((prev) => ({ ...prev, [type]: item }));
    };


    const handlePreviewModalOpen = (cellData: TemplateLibraryTableRowType) => {
      setPreviewModal({status: true, data: cellData});
    }

    const renderHeaderWithMenu = (column: MRT_Column<TemplateLibraryTableRowType>, type: keyof typeof tableActionMenu, menuItems: string[]) => {
      const selected = selectedSort[type];
      const isAscending = selected?.key === "ASCENDING";

      return (
        <Box display="flex" alignItems="center" gap="4px">
          <Box>{column.columnDef.header}</Box>

          {selected ? <Box className="cursor-pointer" height="20px">
            {isAscending ? <SvgIcon component="arrowDown" size={20} fill="#5C5C5C" /> :
              <SvgIcon component="arrowUp" size={20} fill="#5C5C5C" />}
          </Box>: <Box ></Box>}

          <Box
            height="20px"
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
            onClose={() => handleMenuClose()}
          >
            {menuItems.map((item, index) => {
              const isSelected = selected?.key === item?.key;
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
                  <Box display="flex" alignItems="center" width="100%" color={isSelected ? "#0A68DB" : "#333333"} justifyContent="space-between">
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

const renderTemplateNameHeader = ({ column }: { column: any }) => renderHeaderWithMenu(column, "name", TEMPLATE_SORTING.NAME);
const renderTemplateCreatedHeader = ({ column }: { column: any }) => renderHeaderWithMenu(column, "created", TEMPLATE_SORTING.CREATED);
const renderTemplateModifiedHeader = ({ column }: { column: any }) => renderHeaderWithMenu(column, "modified", TEMPLATE_SORTING.MODIFIED);

    const renderTemplateIconHeader = () => {
      return <Box className="template-checkbox-container icon-header-container">
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
                    '&.MuiFormControlLabel-root': {
                      padding: '0px 10px'
                    }
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

    const renderTemplateCommonHeader = ({column}) => {
      return (
        <Box height="20px" display="flex" alignItems="center">
          {column.columnDef.header}
        </Box>
      )
    }

    const renderTemplateIconCell = ({cell }: {cell: MRT_Cell<TemplateLibraryTableRowType>}) => {
        const data = cell.row?.original;
        return (
               <Box className={`template-checkbox-container ${showCheckbox ? 'force-checkbox':''}`} display='flex' >
                    <FormControlLabel
                      className="form-control-label checkbox-wrapper"
                      onChange={(event) => handleRowSelection((event.target as HTMLInputElement).checked, cell.row.original)}
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
                    /> 
                    <Box onClick={() => handleRowSelection(true, cell.row.original)} sx={{ pointerEvents: "auto" }} className="icon-wrapper cursor-pointer">
                      <IconOutlined sx={{ pointerEvents: 'none', height: '3.6rem', width: '3.6rem' }} startIcon={
                        data?.iconName === "v15-Shop-supply" ?
                        <SvgIcon 
                            component="checkedList"
                            size={18}
                            fill="#0A68DB"
                            style={{ pointerEvents: 'none' }}
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
               </Box>
            )
    }

    const renderTemplateNameCell = ({cell}: {cell: MRT_Cell<TemplateLibraryTableRowType>}) => {
        const data = cell.row?.original;
        return (
               <Box minWidth="300px" display="flex" alignItems="center" gap="10px">
                   <Box display="flex" flexDirection="column" gap="6px">
                        <Box className="template-body-text cursor-pointer" onClick={()=>handlePreviewModalOpen(data)}>{data?.templateName}</Box>
                          {!isDesktop ?
                          <Box display="flex" gap="24px">
                            <Box display="flex" gap="4px" className="template-body-text template-status"><span className="template-title-text">Type:</span>{data?.tagType}</Box>
                            <Box display="flex" gap="4px" className="template-body-text template-status"><span className="template-title-text">Status:</span>
                              {data?.status === "Incomplete" ? 
                                <Box display='flex' gap='2px' alignItems='center' justifyContent='center' color="#F44336">
                                  <Box>{data?.status}</Box>
                                  <><SvgIcon component={'exclamationTriangle' as IconName} size={16} fill="#F44336" /></>
                                </Box> :
                                <Box display='flex' gap='2px'>{data?.status || "- -"}</Box>
                              }
                            </Box>
                          </Box>
                          :""}
                   </Box>
               </Box>
            )
    }

    const renderTemplateStatusCell = ({cell}: {cell: MRT_Cell<TemplateLibraryTableRowType>}) => {
      const data = cell.row?.original;
      return (<Box>
        {data?.status === "Incomplete" ? 
          <Box display='flex' gap='2px' alignItems='center' justifyContent='center' color="#F44336">
            <Box>{data?.status}</Box>
            <><SvgIcon component={'exclamationTriangle' as IconName} size={16} fill="#F44336" /></>
          </Box> :
          <Box display='flex' gap='2px'>{data?.status || "- -"}</Box> 
        }
      </Box>
      )
    }

    const renderTemplateCreatedCell = ({cell}: {cell: MRT_Cell<TemplateLibraryTableRowType>}) => {
      const templateData = cell.row.original;
      return (
            <Box display="flex" gap="4px" alignItems='center'>
              <Box>{formatDate(templateData?.createdTime)}</Box>
                <Tooltip 
                  key={templateData.templateId}
                  title={<Box>ID: {templateData.templateId}</Box>}
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
                  open={tooltipId === templateData.templateId}
                  disableFocusListener
                  disableHoverListener
                  disableTouchListener
                >
                  <Box
                    display="flex"
                    className="cursor-pointer"
                    onClick={() => handleTooltip(templateData.templateId)}
                  >
                    <SvgIcon component="infoCircle" size={18} fill="#5C5C5C" />
                  </Box>
                </Tooltip>
              </Box>
            )
    }

    const renderTemplateModifiedCell = ({cell}: {cell: MRT_Cell<TemplateLibraryTableRowType>}) => {
      const templateData = cell.row.original;
      return (
            <Box display="flex" gap="4px" alignItems='center'>
              <Box>{formatDate(templateData?.lastModifiedTime)}</Box>
            </Box>
            )
    }

    const renderActionsCell = ({cell}: {cell: MRT_Cell<TemplateLibraryTableRowType>}) => {
      const status = cell.row.original?.status;
      const disabledActions = selectedTemplate?.length > 1;
        return (
            <Box display="flex" alignItems="center">
              <IconButton disabled={(disabledActions || status === "Incomplete") ? true : false} disableHover><SvgIcon component="send" size={20} /></IconButton>
              <IconButton disabled={disabledActions} disableHover><SvgIcon component="copy" size={20} /></IconButton>
              <IconButton disabled={disabledActions} disableHover><SvgIcon component="edit" size={20} /></IconButton>
              <IconButton disabled={disabledActions} disableHover><SvgIcon component="download" size={20} /></IconButton>
              <IconButton disabled={disabledActions} disableHover><SvgIcon component="delete" size={20} fill={disabledActions ? "#FFCCC8" : "#F4433D"}/></IconButton>
            </Box>
        )
    }

    const columns = [
      {
        accessorKey: "iconName",
        header: "",
        Header: renderTemplateIconHeader,
        Cell: renderTemplateIconCell,
        muiTableHeadCellProps: () => ({className: "template-head-text", style:{width: "50px", padding: "0.8rem 0.6rem 0.8rem 1.6rem"} }),
        muiTableBodyCellProps: () => ({className: "template-body-text", style: { padding: "0.8rem 0.6rem 0.8rem 1.6rem"} })
     },
      {
        accessorKey: "templateName",
        header: "Name",
        Header: renderTemplateNameHeader,
        Cell: renderTemplateNameCell,
        muiTableHeadCellProps: () => ({className: "template-head-text", style:{width:"200px", padding: "0.8rem 0.4rem 0.8rem 0.6rem"} }),
        muiTableBodyCellProps: () => ({className: "template-body-text", style: {padding: "0.8rem 0.4rem 0.8rem 0.6rem"} })
      }]

    const desktopColumns = [
      {
        accessorKey: "tagType",
        header: "Type",
        Header: renderTemplateCommonHeader,
        muiTableHeadCellProps: () => ({className: "template-head-text", style:{width:"200px", padding:"1rem 0.8rem"} }),
        muiTableBodyCellProps: () => ({className: "template-body-text" })
      },
      {
        accessorKey: "status",
        header: "Status",
        Header: renderTemplateCommonHeader,
        Cell: renderTemplateStatusCell,
        muiTableHeadCellProps: () => ({className: "template-head-text", style:{width:"200px", padding:"1rem 0.8rem"} }),
        muiTableBodyCellProps: () => ({className: "template-body-text" })
      }
    ];  

    const columns2 = [{
        accessorKey: "createdTime",
        header: "Created",
        Header: renderTemplateCreatedHeader,
        Cell: renderTemplateCreatedCell,
        muiTableHeadCellProps: () => ({className: "template-head-text", style:{width:"200px", padding:"1rem 0.8rem"} }),
        muiTableBodyCellProps: () => ({className: "template-body-text" })
      },
      {
        accessorKey: "lastModifiedTime",
        header: "Last Modified",
        Header: renderTemplateModifiedHeader,
        Cell: renderTemplateModifiedCell,
        muiTableHeadCellProps: () => ({className: "template-head-text", style:{width:"200px", padding:"1rem 0.8rem"} }),
        muiTableBodyCellProps: () => ({className: "template-body-text" })
      },
     {
        accessorKey: "actions",
        header: "Actions",
        Header: renderTemplateCommonHeader,
        Cell: renderActionsCell,
        muiTableHeadCellProps: () => ({className: "template-head-text", style:{padding:"1rem 1.6rem 1rem 0.8rem"} }),
        muiTableBodyCellProps: () => ({className: "template-body-text", style:{paddingRight:"1.6rem"} })
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
                isRowSelected={isRowSelected} 
            />

           {/* Template Preview Popup */}
            <CommonModal
              open={previewModal.status}
              onClose={() => setPreviewModal({status: false, data: null})}
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