import React from "react";
import { useSearchParams } from "react-router-dom";

import {
  Select,
  SelectItem,
  SelectValue,
  SelectTrigger,
  SelectContent,
} from "@/components/ui/select";
import useMockData from "@/utils";

const StatusSelector: React.FC = () => {
  const { parent_status_options } = useMockData();
  const [searchParams, setSearchParams] = useSearchParams();

  // Get the current status value from the URL params or default to "active"
  const currentStatus = searchParams.get("status") || "active";

  const handleSelectChange = (value: string) => {
    searchParams.set("status", value);
    setSearchParams(searchParams);
  };

  return (
    <Select value={currentStatus} onValueChange={handleSelectChange}>
      <SelectTrigger className='w-[180px]'>
        <SelectValue placeholder='Select Status' />
      </SelectTrigger>
      <SelectContent>
        {parent_status_options?.map((item) => (
          <SelectItem key={item._id} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default StatusSelector;
