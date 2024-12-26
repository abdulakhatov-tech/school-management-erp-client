// External imports
import React from "react";

import { MdSunny } from "react-icons/md";
import { IoIosMoon } from "react-icons/io";

// Internal imports
import { Button } from "@/components/ui/button";
import { toggleTheme } from "@/store/slices/theme";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";

type PropsI = {
  className?: string;
};

const Theme: React.FC<PropsI> = () => {
  const dispatch = useAppDispatch();
  const themeMode = useAppSelector((state) => state.theme.themeMode);

  const handleToggle = () => {
    dispatch(toggleTheme());

    // Toggle the dark class on the document body
    if (document.body.classList.contains("dark")) {
      document.body.classList.remove("dark");
    } else {
      document.body.classList.add("dark");
    }
  };

  return (
    <Button onClick={handleToggle} size='sm'>
      {themeMode === "dark" ? <IoIosMoon /> : <MdSunny />}
    </Button>
  );
};

export default Theme;
