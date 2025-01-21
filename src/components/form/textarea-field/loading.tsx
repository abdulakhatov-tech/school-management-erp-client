import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface LoadingProps {
  rows?: number;
}

const Loading: React.FC<LoadingProps> = ({ rows = 1 }) => {
  return (
    <Skeleton style={{ height: `${rows * 2 * 9}px` }} className="w-full" />
  );
};

export default Loading;
