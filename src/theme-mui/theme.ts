import { createTheme } from "@mui/material/styles";
import typography from "./typography";
import { lightPalette, darkPalette } from "./palette";
import { buttonConfig } from "./components/button.theme";

export const getTheme = (mode: "light" | "dark") => {
  const baseTheme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 1200,
        md: 1440,
        lg: 1440,
        xl: 2560,
      },
    },
    palette: mode === "light" ? lightPalette : darkPalette,
    typography,
    shape: { borderRadius: 8 },
  });

  return createTheme(baseTheme, {
    components: {
      MuiButton: {
        variants: [
          {
            props: { variant: "primary-filled" },
            style: buttonConfig(baseTheme).primary,
          },
          {
            props: { variant: "icon-outlined" },
            style: buttonConfig(baseTheme).iconOutlined,
          },
        ],
      },
    },
  });
};
