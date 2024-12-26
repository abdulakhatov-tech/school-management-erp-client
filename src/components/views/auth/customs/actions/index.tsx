import React from "react";
import { Locale, Theme } from "@/components/constants";

const AuthActions:React.FC = () => {
  return  <div className='absolute top-6 md:top-10 right-6 md:right-10 flex items-center gap-2'>
  <Locale />
  <Theme />
</div>
};

export default AuthActions;
