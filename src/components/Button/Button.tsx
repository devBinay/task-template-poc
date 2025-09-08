import Button from "@mui/material/Button";
import type { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { buttonConfig } from "./ButtonConfig";

export const PrimaryButton = styled(Button)<ButtonProps>(
  ({ theme }) => buttonConfig(theme).primary
);