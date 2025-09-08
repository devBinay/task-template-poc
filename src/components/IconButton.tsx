import styled from "@emotion/styled";
import { alpha } from "@mui/material";
import ButtonBase from "@mui/material/ButtonBase";
import { type ButtonBaseProps } from "@mui/material";


interface IconButtonProps extends ButtonBaseProps {
    variant?: Variant
}

type Variant = 'primary' | 'secondary' | 'outline';


const IconButtonStyled = styled(ButtonBase,{
    shouldForwardProp: (prop) => prop !== 'variant',
})<{variant?:Variant}>(({ theme, variant }) => ({
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.default,
  border: "1px solid transparent", 
  padding: ".5rem",
  transition:"all .2s ease-in-out",
  '&:hover': {
    cursor: "pointer",
    backgroundColor: alpha(theme.palette.primary.main,0.1),
    ...(variant === 'outline' && {
      border: `1px solid ${theme.palette.primary.main}`,
      color: theme.palette.primary.main,
    }),
    ...(variant === 'primary' && {
        color: theme.palette.primary.main,
      }),
  },
}));

const IconButton = ({ children, ...props }: IconButtonProps) => {
  return <IconButtonStyled {...props}>{children}</IconButtonStyled>;
};

export default IconButton;
