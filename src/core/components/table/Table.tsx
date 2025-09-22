import type { TemplateType } from "@/pages/template-library/types/template-library.type";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import type { MRT_RowData, MRT_Row } from "material-react-table";

interface TableProps {
  tableProps;
  isRowSelected?: (rowData: TemplateType) => boolean;
}

const Table = ({ tableProps, isRowSelected, ...props }: TableProps) => {
  const table = useMaterialReactTable({
    ...tableProps,
    enableStickyHeader:true,
    muiTableContainerProps:{
      sx:{
        maxHeight:'57.5rem'
      }
    },
    muiTableBodyRowProps: ({ row }: { row: MRT_Row<MRT_RowData> }) => ({
      hover: isRowSelected && isRowSelected(row.original as TemplateType) ? false : true,
      sx: {
        backgroundColor: isRowSelected && isRowSelected(row.original as TemplateType) ? "#C9E0FD" : "inherit",
        transition: "backgroundColor 1s",
      },
    }),
  });

  return <MaterialReactTable table={table} {...props} />;
};

export default Table;