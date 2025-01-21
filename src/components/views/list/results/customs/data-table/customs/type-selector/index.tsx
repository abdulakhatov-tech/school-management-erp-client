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
import { Skeleton } from "@/components/ui/skeleton";

const StatusSelector: React.FC<{ loading: boolean }> = ({ loading }) => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  // Get the current status value from the URL params or default to "active"
  const currentStatus = searchParams.get("type") || "all";

  const handleSelectChange = (value: string) => {
    // Create a new instance of searchParams to preserve other query params
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("type", value); // Update the status parameter
    setSearchParams(newSearchParams); // Apply the updated query parameters
  };

  if(loading) {
    return <Skeleton className="w-[180px] h-8" />
  }

  return (
    <Select value={currentStatus} onValueChange={handleSelectChange}>
      <SelectTrigger className='w-[180px]'>
        <SelectValue placeholder='Select Class' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={"all"}>{t('data-table.columns.all_types')}</SelectItem>
        <SelectItem value={"assignment"}>
          {t("app_sidebar.assignments")}
        </SelectItem>
        <SelectItem value={"exam"}>{t("app_sidebar.exams")}</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default StatusSelector;
