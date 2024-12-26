import { Loader } from "lucide-react";
import type { FC } from "react";
// import { PiSpinnerBold } from "react-icons/pi";

interface LoadingSpinnerProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeClasses = {
  sm: "text-[16px]",
  md: "text-[22px]",
  lg: "text-[32px]",
  xl: "text-[42px]",
};

const LoadingSpinner: FC<LoadingSpinnerProps> = ({ className, size = "md" }) => {
  return (
    <Loader className={`spin ${sizeClasses[size]} ${className || ""}`} />
  );
};

export default LoadingSpinner;
