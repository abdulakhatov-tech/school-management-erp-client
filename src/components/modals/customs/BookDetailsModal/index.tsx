import { format } from "date-fns";
import { Link, useSearchParams } from "react-router-dom";
import React, { useMemo, useCallback } from "react";

import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import { ITeacher } from "@/interfaces/user";
import { Skeleton } from "@/components/ui/skeleton";
import { useSubjectService } from "@/services/subjects";
import noImg from "@/assets/images/no-image.png";
import { Separator } from "@/components/ui/separator";
import { useTranslation } from "react-i18next";

const BookDetailsModal: React.FC = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const subjectId = useMemo(
    () => searchParams.get("subjectId"),
    [searchParams]
  );

  const { getSubjectById } = useSubjectService();
  const { data: subject, isLoading } = getSubjectById; // Assuming `getSubjectById` is a hook or query

  const handleOpenChange = useCallback(
    (isOpen: boolean) => {
      if (!isOpen) {
        setSearchParams((prevParams) => {
          const updatedParams = new URLSearchParams(prevParams);
          updatedParams.delete("subjectId");
          return updatedParams;
        });
      }
    },
    [setSearchParams]
  );

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className='space-y-4'>
          <Skeleton className='h-8 w-full' />
          <Skeleton className='h-4 w-3/4' />
          <Skeleton className='h-64 w-full' />
        </div>
      );
    }

    return (
      <>
        <img
          src={subject?.imgUrl || noImg}
          alt={subject?.name || "Subject"}
          className='rounded-md w-[95%] mx-auto object-contain h-48 mb-4'
        />

        <DialogTitle className='text-xl font-semibold'>
          {t(`subjects.${subject?.name}`)}
        </DialogTitle>
        <DialogDescription className='text-gray-600'>
          {subject?.description}
        </DialogDescription>
        <Separator />

        <ul className='flex gap-2 items-center text-gray-600'>
          {t("subject_form.teachers")}:
          {subject?.teachers?.length ? (
            subject?.teachers.map((teacher: ITeacher, index: number) => (
              <li
                key={teacher._id}
                className='text-sm text-blue-500 hover:underline'
              >
                <Link to={`/list/teachers/${teacher?._id}`}>
                  {teacher.fullName}
                </Link>
                {index < subject?.teachers?.length - 1 && ","}
              </li>
            ))
          ) : (
            <span className='text-black dark:text-white'>
              {t("subject_form.no_teachers")}
            </span>
          )}
        </ul>

        <time className="text-end">
          {subject?.createdAt ? format(new Date(subject?.createdAt), 'MMMM dd, yyyy') : 'Date not available'}
        </time>
      </>
    );
  };

  return (
    <Dialog open={Boolean(subjectId)} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>{renderContent()}</DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default BookDetailsModal;
