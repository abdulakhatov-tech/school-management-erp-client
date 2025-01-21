import React from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IClass } from "@/interfaces/class";
import { Skeleton } from "@/components/ui/skeleton";
import { useClassService } from "@/services/classes";

const StatusSelector: React.FC<{ loading: boolean }> = ({ loading }) => {
  const { t } = useTranslation();
  const { getAllClasssUnpaginated } = useClassService();
  const [searchParams, setSearchParams] = useSearchParams();

  const { data = [], isLoading } = getAllClasssUnpaginated;

  const class_options = data?.map((item: IClass) => ({
    _id: item._id,
    label: item.name,
    value: item._id,
  }));

  // Get the current status value from the URL params or default to "active"
  const currentStatus = searchParams.get("class") || "all";

  const handleSelectChange = (value: string) => {
    // Create a new instance of searchParams to preserve other query params
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("class", value); // Update the status parameter
    setSearchParams(newSearchParams); // Apply the updated query parameters
  };

  if (loading) {
    return <Skeleton className='w-[130px] h-8' />;
  }

  return (
    <Select value={currentStatus} onValueChange={handleSelectChange}>
      <SelectTrigger className='w-[130px]'>
        <SelectValue placeholder='Select Class' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={"all"}>
          {t("data-table.columns.all_classes")}
        </SelectItem>
        {isLoading ? (
          <Skeleton className='h-10 w-[200px]' />
        ) : (
          class_options?.map((item: any) => (
            <SelectItem key={item._id} value={item.value}>
              {item.label} {t("data-table.columns.class")}
            </SelectItem>
          ))
        )}
      </SelectContent>
    </Select>
  );
};

export default StatusSelector;
