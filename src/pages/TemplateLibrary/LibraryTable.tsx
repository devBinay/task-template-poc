import Box from "@mui/material/Box";
import Table from "../../components/Table/Table";
import { useMemo } from "react";
import {  type MRT_ColumnDef} from "material-react-table";
import { demoTableData } from "./tableData";

  export type TemplateLibrary = {
  template_name: string;
  type: string;
  status: string;
  created: string;
  last_modified: string;
};

const LibraryTable : React.FC = () => {

    const renderTemplateNameCell = ({cell}) => {
        const data = cell.getValue();
        return (
               <Box minWidth="400px" display="flex" alignItems="center" gap="10px">
                   <Box>icon here</Box>
                   <Box display="flex" flexDirection="column" gap="6px">
                          <Box fontWeight={500}>{data?.name}</Box>
                          <Box display="flex" gap="10px">
                                <Box>Type: {data?.type}</Box>
                                <Box>Status: {data?.status}</Box>
                          </Box>
                   </Box>
               </Box>
            )
    }

    const renderActionsCell = ({cell}) => {
        return (
            <Box display="flex" alignItems="center" gap="6px">
                
            </Box>
        )
    }

    const columns = useMemo<MRT_ColumnDef<TemplateLibrary>[]>(
    () => [
      {
        accessorKey: "template_name",
        header: "Name",
        Cell: renderTemplateNameCell,
      },
      {
        accessorKey: "created",
        header: "Created",
      },
      {
        accessorKey: "last_modified",
        header: "Last Modified",
      },
         {
        accessorKey: "actions",
        header: "Actions",
        Cell: renderActionsCell,
      },
    ],
    []
  );

  const templateTableProps = {
    columns,
    data: demoTableData,
    enableColumnActions: false,
    enableColumnFilters: false,
    enablePagination: false,
    enableSorting: false,
    enableBottomToolbar: false,
    enableTopToolbar: false,
    // muiTableBodyRowProps: { hover: false },
  }

    return (
        <div>
            <Table 
                tableProps={templateTableProps}
            />
        </div>
    )
}


export default LibraryTable;