import type { Theme } from "@mui/material/styles";
import { buttonPalette } from "./button.palette";
import { buttonSizes } from "./button.sizes";

export const buttonConfig = (
  theme: Theme,
  btnType: keyof typeof buttonPalette["light"],
  subtype: string,
  size: keyof typeof buttonSizes = "medium"
) => {
  const mode = (theme.palette.mode as "light" | "dark") || "light";
  const typeTokens = (buttonPalette as any)[mode][btnType];
  const states = typeTokens?.[subtype];
  const sizing = buttonSizes[size];
  
  if(!states.default) 
    return;

  return {
    fontSize: sizing.fontSize,
    padding: sizing.padding,
    borderRadius: sizing.borderRadius,
    textTransform: "none" as const,
    fontWeight: 500,

    backgroundColor: states.default.bgColor,
    color: states.default.color,
    border: states.default.border,

    "&:hover": {
      backgroundColor: states.hover.bgColor,
      color: states.hover.color,
      border: states.hover.border,
    },
    "&:focus": {
      backgroundColor: states.focus.bgColor,
      color: states.focus.color,
      border: states.focus.border,
      outline: "none",
      boxShadow: "none",
    },
    "&:active": {
      backgroundColor: states.active.bgColor,
      color: states.active.color,
      border: states.active.border,
    },
    "&.Mui-disabled, &:disabled": {
      backgroundColor: states.disabled.bgColor,
      color: states.disabled.color,
      border: states.disabled.border,
    },
  };
};
