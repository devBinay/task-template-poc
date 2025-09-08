
import { general } from "../../assets/icons";

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
  stroke,
  ...props
}) => {
    const Component: any = icons[component as keyof typeof icons];
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