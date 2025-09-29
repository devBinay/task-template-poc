import React, { type ReactNode, type CSSProperties } from "react";
import './PageTemplate.style.scss';
import { useGetViewPortSize } from "@/utils/get-viewport-size";
interface CommonContentActionBarProps {
  children: ReactNode;
  style?: CSSProperties;
}

interface SectionProps {
  children: ReactNode;
  style?: CSSProperties;
}

const Header: React.FC<SectionProps> = ({ children, style }) => {
  return (
    <div
    className="pagetemplate__header"
      style={{
     
        ...style,
      }}
    >
      {children}
    </div>
  );
};

const Content: React.FC<SectionProps> = ({ children, style }) => {
  return (
    <div
    className="pagetemplate__content"
      style={{
     
        ...style,
      }}
    >
      {children}
    </div>
  );
};

const CommonContentActionBar: React.FC<CommonContentActionBarProps> & {
  Header: typeof Header;
  Content: typeof Content;
} = ({ children, style }) => {

  const viewportSize = useGetViewPortSize();
  const isDesktop = viewportSize === 'xl' || viewportSize === 'lg';
  return (
    <div
    className={`pagetemplate__root ${isDesktop ? "desktop" : "tablet"}`}
      style={{
      
        ...style,
      }}
    >
      {children}
    </div>
  );
};

CommonContentActionBar.Header = Header;
CommonContentActionBar.Content = Content;

export default CommonContentActionBar;
