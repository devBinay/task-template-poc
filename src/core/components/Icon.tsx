import React from "react";
import { icons } from "../constants/Icons";
import Box from "@mui/material/Box";
interface SvgIconProps {
  component: keyof typeof icons;
  size?: string | number;
  className?: string;
  fill?: string;
  stroke?: string;
}

const SvgIcon: React.FC<SvgIconProps> = ({
  component,
  size = 24,
  className,
  fill = "currentColor",
  stroke,
  ...props
}) => {
    const Component = icons[component]
    if (!Component) {
       return <Box sx={{width:size, height: size, bgcolor:"lightgray", borderRadius:"50%"}}></Box>
    }
  return (
    <Component
      width={size}
      height={size}
      className={className}
      fill={fill}
      stroke={stroke}
      {...props}
    />
  );
};

export default SvgIcon;