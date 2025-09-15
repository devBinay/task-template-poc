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
      hover: isRowSelected && isRowSelected(row.original as TemplateLibraryTableRowType) ? false : true,
      sx: {
        bgcolor: isRowSelected && isRowSelected(row.original as TemplateLibraryTableRowType) ? "rgba(10, 104, 219, 0.1)" : "inherit",
      },
    }),
  });

  return <MaterialReactTable table={table} {...props} />;
};

export default Table;