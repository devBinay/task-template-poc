
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import type { MRT_TableOptions, MRT_RowData } from "material-react-table";

interface TableProps {
  tableProps: MRT_TableOptions<MRT_RowData>;
}

const Table = ({
    tableProps,
    ...props
}: TableProps) => {
    const table = useMaterialReactTable(tableProps);
  return (
          <MaterialReactTable 
            table={table} 
            {...props}
          />
        );
};

export default Table;