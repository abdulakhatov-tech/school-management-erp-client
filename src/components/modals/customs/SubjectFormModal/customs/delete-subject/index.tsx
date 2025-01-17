import React from "react";
import classNames from "classnames";
import { Eye } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PhotoProvider, PhotoView } from "react-photo-view";

import { Button } from "@/components/ui/button";
import noImage from "@/assets/images/no-image.png";
import useDeleteSubjectFeatures from "./features";
import { useSubjectService } from "@/services/subjects";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { DialogDescription, DialogFooter } from "@/components/ui/dialog";

const DeleteClass: React.FC = () => {
  const { t } = useTranslation();
  const { getSubjectById } = useSubjectService();
  const { handleCloseSubjectModal, handleDeleteSubject, handleImageError } =
  useDeleteSubjectFeatures();

  const { data, isLoading } = getSubjectById;

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-col items-center gap-4'>
        <PhotoProvider>
          <div className='w-[120px] md:w-[140px] h-[120px] md:h-[140px]'>
            <AspectRatio ratio={16 / 9}>
              <PhotoView src={data?.imgUrl || noImage}>
                <div className='relative cursor-pointer eye_wrapper'>
                  <Eye className='absolute z-2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white eye w-5 h-5' />
                  <img
                    src={data?.imgUrl || noImage}
                    alt={data?.name}
                    className='rounded-full object-cover bg-[#f1f1f1] w-[120px] md:w-[140px] h-[120px] md:h-[140px]'
                    onError={handleImageError}
                  />
                </div>
              </PhotoView>
            </AspectRatio>
          </div>
        </PhotoProvider>

        <div className='text-center'>
          <h4 className='text-[16px] font-bold capitalize'>{data?.name}</h4>
        </div>
      </div>
      <DialogDescription className={classNames("max-w-[400px] text-center")}>
        {t("admin_form.delete_description")}
      </DialogDescription>

      <DialogFooter className='flex flex-col md:flex-row gap-2 md:gap-0'>
        <Button variant='outline' onClick={handleCloseSubjectModal}>
          {t("button.cancel")}
        </Button>
        <Button
          variant='destructive'
          onClick={handleDeleteSubject}
          disabled={isLoading}
        >
          {t("button.delete")}
        </Button>
      </DialogFooter>
    </div>
  );
};

export default DeleteClass;
