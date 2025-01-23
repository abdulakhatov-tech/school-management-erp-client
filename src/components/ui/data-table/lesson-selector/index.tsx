import React from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

import {
  Select,
  SelectItem,
  SelectValue,
  SelectTrigger,
  SelectContent,
} from "@/components/ui/select";
import { ILesson } from "@/interfaces/lesson";
import { Skeleton } from "@/components/ui/skeleton";
import { useLessonService } from "@/services/lessons";

const LessonSelector: React.FC<{ loading: boolean }> = ({ loading }) => {
  const { t } = useTranslation();
  const { getAllLessonsUnpaginated } = useLessonService();
  const [searchParams, setSearchParams] = useSearchParams();

  const { data = [], isLoading } = getAllLessonsUnpaginated;

  // Get the current status value from the URL params or default to "active"
  const currentStatus = searchParams.get("lesson") || "all";

  const handleSelectChange = (value: string) => {
    // Create a new instance of searchParams to preserve other query params
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("lesson", value); // Update the status parameter
    setSearchParams(newSearchParams); // Apply the updated query parameters
  };

  if (loading) {
    return <Skeleton className='w-[200px] h-8' />;
  }

  const class_options = data?.data?.map((item: ILesson) => ({
    _id: item._id,
    label: item.name,
    value: item._id,
  }));

  return (
    <Select value={currentStatus} onValueChange={handleSelectChange}>
      <SelectTrigger className='w-[200px]'>
        <SelectValue placeholder='Select Lesson' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={"all"}>
          {t("data-table.columns.all_lessons")}
        </SelectItem>
        {isLoading ? (
          <Skeleton className='h-10 w-[200px]' />
        ) : (
          class_options?.map((item: any) => (
            <SelectItem key={item._id} value={item.value}>
              {item.label} 
            </SelectItem>
          ))
        )}
      </SelectContent>
    </Select>
  );
};

export default LessonSelector;
