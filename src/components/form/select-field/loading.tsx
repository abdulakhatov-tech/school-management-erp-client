import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

// const LoadingSkeleton:React.FC = () => {
//   return <div className="flex flex-col gap-1">
//     {Array(14).fill(null).map((_, idx) => <Skeleton key={idx} className="w-full h-7 rounded-sm" />) }
//   </div>
// };

const LoadingSkeleton:React.FC = () => {
  return <Skeleton className="w-full h-9" />;
};

export default LoadingSkeleton;
