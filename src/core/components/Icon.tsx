import React from "react";
import { icons } from "../constants/Icons";

interface SvgIconProps {
  component: keyof typeof icons;
  size?: number;
  className?: string;
  fill?: string;
  stroke?: string;
}


const SvgIcon: React.FC<SvgIconProps> = ({
  component,
  size = 24,
  className,
  fill = "currentColor",
  stroke
}) => {
    const Component: any = icons[component as keyof typeof icons];
  return (
    <Component
      width={size}
      height={size}
      className={className}
      fill={fill}
      stroke={stroke}
    />
  );
};

export default SvgIcon;