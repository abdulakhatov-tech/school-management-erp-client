import { debounce } from "lodash";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import React, { useState, useCallback, useEffect } from "react";

import { Input } from "@/components/ui/input";
import { Skeleton } from "../../skeleton";

interface PropsI {
  table: any;
  loading?: boolean;
  disabled?: boolean;
}

const DataTableSearchInput: React.FC<PropsI> = ({ table, loading, disabled=false }) => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");

  // Function to validate the search input
  const isValidSearch = (value: string) => {
    const regex = /^[a-zA-Z0-9 ]*$/;
    return regex.test(value);
  };

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      const newSearchParams = new URLSearchParams(searchParams);

      if (value) {
        newSearchParams.set("search", value);
      } else {
        newSearchParams.delete("search");
      }
  
      setSearchParams(newSearchParams);
    }, 600), 
    [searchParams] 
  );

  const handleInputChange =
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;

      if (isValidSearch(value)) {
        setSearch(value); 
        debouncedSearch(value);
      } else {
        console.log(
          "Invalid input! Only letters, numbers, and spaces are allowed."
        );
      }
    }

  useEffect(() => {
    // When `searchParams` changes, update the search state
    setSearch(searchParams.get("search") || "");
  }, [searchParams]);

  
  if(loading) {
    return <Skeleton className="w-[300px] md:w-[370px] h-8" />
  }


  return (
    <Input
      value={search}
      disabled={disabled || loading}
      readOnly={loading}
      className='max-w-sm'
      onChange={handleInputChange}
      placeholder={t("data-table.search")}
      style={loading ? { cursor: "not-allowed" } : {}}
    />
  );
};

export default DataTableSearchInput;