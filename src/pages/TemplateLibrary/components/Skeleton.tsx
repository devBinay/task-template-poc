import React from "react";
import { Box, Skeleton } from "@mui/material";

const TableRowSkeleton: React.FC = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-evenly"
      sx={{ padding: "12px 16px", borderBottom: "1px solid #eee" }}
    >
      {/* Icon + Name */}
      <Box display="flex" alignItems="center" gap={2} flex={1}>
        <Skeleton variant="circular" width={40} height={40} />
        <Box>
            <Skeleton variant="rectangular" width={300} height={20} />
            <Box display="flex" gap="8px" mt="4px">
                <Skeleton variant="rectangular" width={80} height={20} />
                <Skeleton variant="rectangular" width={80} height={20} />
            </Box>
        </Box>
      </Box>

      {/* Created */}
      <Box flex={0.5} display="flex" gap="4px">
        <Skeleton variant="rectangular" width={100} height={20} />
        <Skeleton variant="circular" width={20} height={20} />
      </Box>

      {/* Last Modified */}
      <Box flex={0.5}>
        <Skeleton variant="rectangular" width={100} height={20} />
      </Box>

      {/* Actions */}
      <Box display="flex" gap={1} flex={0.3}>
        <Skeleton variant="circular" width={32} height={32} />
        <Skeleton variant="circular" width={32} height={32} />
        <Skeleton variant="circular" width={32} height={32} />
      </Box>
    </Box>
  );
};

export default TableRowSkeleton;
