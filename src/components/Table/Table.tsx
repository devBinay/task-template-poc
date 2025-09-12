import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import type { MRT_TableOptions, MRT_RowData, MRT_Row } from "material-react-table";

interface TableProps {
  tableProps: MRT_TableOptions<MRT_RowData>;
  isRowSelected?: (rowData: MRT_RowData) => boolean; // 👈 pass in from parent
}

const Table = ({ tableProps, isRowSelected, ...props }: TableProps) => {
  const table = useMaterialReactTable({
    ...tableProps,
    muiTableBodyRowProps: ({ row }: { row: MRT_Row<MRT_RowData> }) => ({
      sx: {
        bgcolor: isRowSelected && isRowSelected(row.original) ? "#E3F2FD" : "inherit",
        "&:hover": {
          bgcolor: "#E3F2FD",
        },
      },
    }),
  });

  return <MaterialReactTable table={table} {...props} />;
};

export default Table;