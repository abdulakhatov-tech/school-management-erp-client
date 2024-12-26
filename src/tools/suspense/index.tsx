import React from "react";

const Loader: React.FC = () => {
  return (
    <div className='w-full h-full flex items-center justify-center'>
      <LoadingSpinner size='xl' />
    </div>
  );
};

import { type FC, Suspense } from "react";
import LoadingSpinner from "../spinner";

type SuspenseWrapperPropT = {
  children: React.ReactNode;
};

const SuspenseWrapper: FC<SuspenseWrapperPropT> = ({ children }) => {
  return <Suspense fallback={<Loader />}>{children}</Suspense>;
};

export default SuspenseWrapper;
