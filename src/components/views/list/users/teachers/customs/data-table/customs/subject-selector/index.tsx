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
import { ISubject } from "@/interfaces/subject";
import { Skeleton } from "@/components/ui/skeleton";
import { useSubjectService } from "@/services/subjects";

const SubjectSelector: React.FC<{ loading: boolean }> = ({ loading }) => {
  const { t } = useTranslation();
  const { getAllSubjectsUnpaginated } = useSubjectService();
  const [searchParams, setSearchParams] = useSearchParams();

  const currentSubject = searchParams.get("subject") || "all";

  const { data, isLoading } = getAllSubjectsUnpaginated;

  const handleSelectChange = (value: string) => {
    searchParams.set("subject", value);
    setSearchParams(searchParams);
  };

  if (loading || isLoading) {
    return <Skeleton className='w-[150px] h-8' />;
  }

  console.log(data, "data subjects");

  return (
    <Select value={currentSubject} onValueChange={handleSelectChange}>
      <SelectTrigger className='w-[150px]'>
        <SelectValue placeholder='Select Status' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={"all"}>
          {t("data-table.columns.all_subjects")}
        </SelectItem>
        {data?.map((item: ISubject) => (
          <SelectItem key={item?._id} value={item?._id}>
            {t(`subjects.${item?.name}`)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SubjectSelector;
