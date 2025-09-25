import { createTheme } from "@mui/material/styles";
import typography from "./typography";
import { lightPalette, darkPalette } from "./palette";
import { buttonConfig } from "./components/button/button.theme";
import { buttonSizes } from "./components/button/button.sizes";
import { buttonPalette } from "./components/button/button.palette";

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

const modeTokens = (buttonPalette as any)[mode];
const btnVariants = Object.keys(modeTokens).flatMap((btnType) =>
    Object.keys(modeTokens[btnType]).flatMap((subtype) =>
      (Object.keys(buttonSizes) as Array<keyof typeof buttonSizes>).map((size) => ({
        props: { variant: subtype, btnType, size },   // MATCH based on props passed to <Button />
        style: buttonConfig(baseTheme, btnType as any, subtype, size),
      }))
    )
  );
console.log("=========btnVariants",btnVariants)
  return createTheme(baseTheme, {
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
          },
        },
        variants: btnVariants
      },
    },
  });
};
