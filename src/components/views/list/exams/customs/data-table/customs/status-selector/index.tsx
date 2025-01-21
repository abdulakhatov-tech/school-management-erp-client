import React from "react";
import { useSearchParams } from "react-router-dom";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ILesson } from "@/interfaces/lesson";
import { Skeleton } from "@/components/ui/skeleton";
import { useLessonService } from "@/services/lessons";

const StatusSelector: React.FC<{ loading: boolean }> = ({ loading }) => {
  const { getAllLessonsUnpaginated } = useLessonService();
  const [searchParams, setSearchParams] = useSearchParams();

  const { data = [], isLoading } = getAllLessonsUnpaginated;

  const lesson_options = data?.data?.map((lesson: ILesson) => ({
    _id: lesson._id,
    label: lesson.name,
    value: lesson._id,
  }));

  // Get the current status value from the URL params or default to "active"
  const currentStatus = searchParams.get("lesson") || "all";

  const handleSelectChange = (value: string) => {
    // Create a new instance of searchParams to preserve other query params
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("lesson", value); // Update the status parameter
    setSearchParams(newSearchParams); // Apply the updated query parameters
  };

  if (loading) {
    return <Skeleton className='w-[180px] h-8' />;
  }

  return (
    <Select value={currentStatus} onValueChange={handleSelectChange}>
      <SelectTrigger className='w-[180px]'>
        <SelectValue placeholder='Select Lesson' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={"all"}>All Lessons</SelectItem>
        {isLoading ? (
          <Skeleton className='h-10 w-[200px]' />
        ) : (
          lesson_options?.map((item: any) => (
            <SelectItem key={item._id} value={item.value}>
              {item.label}
            </SelectItem>
          ))
        )}
      </SelectContent>
    </Select>
  );
};

export default StatusSelector;
