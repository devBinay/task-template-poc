import type { TemplateLibraryTableRowType } from "@/pages/TemplateLibrary/types";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import type { MRT_RowData, MRT_Row } from "material-react-table";

interface TableProps {
  tableProps;
  isRowSelected?: (rowData: TemplateLibraryTableRowType) => boolean; // 👈 pass in from parent
}

const Table = ({ tableProps, isRowSelected, ...props }: TableProps) => {
  const table = useMaterialReactTable({
    ...tableProps,
    muiTableBodyRowProps: ({ row }: { row: MRT_Row<MRT_RowData> }) => ({
      sx: {
        bgcolor: isRowSelected && isRowSelected(row.original as TemplateLibraryTableRowType) ? "#E3F2FD" : "inherit",
        "&:hover": {
          bgcolor: "#E3F2FD",
        },
      },
    }),
  });

  return <MaterialReactTable table={table} {...props} />;
};

export default Table;