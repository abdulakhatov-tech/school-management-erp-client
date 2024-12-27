import React from "react";

interface PropsI {
  children: React.ReactNode;
  className?: string;
}

const CardTitle: React.FC<PropsI> = ({ children, className }) => {
  return <h2 className={`text-lg font-semibold ${className}`}>{children}</h2>;
};

export default CardTitle;
