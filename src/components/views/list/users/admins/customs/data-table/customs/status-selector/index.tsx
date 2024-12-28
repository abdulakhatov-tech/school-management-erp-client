import React from "react";
import { useSearchParams } from "react-router-dom";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useMockData from "@/utils";

const StatusSelector: React.FC = () => {
  const { admin_status_options } = useMockData();
  const [searchParams, setSearchParams] = useSearchParams();

  // Get the current status value from the URL params or default to "active"
  const currentStatus = searchParams.get("status") || "active";

  const handleSelectChange = (value: string) => {
    // Create a new instance of searchParams to preserve other query params
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("status", value); // Update the status parameter
    setSearchParams(newSearchParams); // Apply the updated query parameters
  };

  return (
    <Select value={currentStatus} onValueChange={handleSelectChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Status" />
      </SelectTrigger>
      <SelectContent>
        {admin_status_options?.map((item) => (
          <SelectItem key={item._id} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default StatusSelector;
