import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Outlet } from "react-router-dom";

export const ComponentLibrary: React.FC = () => {
  return (
    <>
      <Box sx={{ bgcolor: '#cfe8fc', height: '10vh', padding: '1rem' }} >
        Component Library
      </Box>
      <Outlet />
    </>
  );
};