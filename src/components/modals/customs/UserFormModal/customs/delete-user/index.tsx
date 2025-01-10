import React from "react";
import { Eye } from "lucide-react";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { PhotoProvider, PhotoView } from "react-photo-view";

import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { DialogDescription, DialogFooter } from "@/components/ui/dialog";

import Loading from "./loading";
import useDeleteUserFeatures from "./features";
import noUser from "@/assets/icons/no-user.svg";
import { useAdminService } from "@/services/users/admins";
import { useParentsService } from "@/services/users/parents";
import { useTeacherService } from "@/services/users/teachers";
import { useStudentService } from "@/services/users/students";
import { UserModalType } from "@/store/slices/user-form-modal";

const DeleteUser: React.FC = () => {
  const { t } = useTranslation();
  const { getAdminById } = useAdminService();
  const { getTeacherById } = useTeacherService();
  const { getStudentById } = useStudentService();
  const { getParentById } = useParentsService();

  const { handleClose, handleDeleteUser, handleImageError, modalType } =
    useDeleteUserFeatures();

  const userServices = {
    admin: getAdminById,
    teacher: getTeacherById,
    student: getStudentById,
    parent: getParentById,
  };

  const { data, isLoading } = userServices[modalType as UserModalType] || {};

  if (!modalType) return null;

  const renderUserDetails = () => (
    <div className='flex flex-col items-center gap-4'>
      <PhotoProvider>
        <div className='w-[120px] md:w-[140px] h-[120px] md:h-[140px]'>
          <AspectRatio ratio={16 / 9}>
            <PhotoView src={data?.profilePhoto || noUser}>
              <div className='relative cursor-pointer eye_wrapper'>
                <Eye className='absolute z-2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white eye w-5 h-5' />
                <img
                  src={data?.profilePhoto || noUser}
                  alt={data?.fullName}
                  className='rounded-full object-cover bg-[#f1f1f1] w-[120px] md:w-[140px] h-[120px] md:h-[140px]'
                  onError={handleImageError}
                />
              </div>
            </PhotoView>
          </AspectRatio>
        </div>
      </PhotoProvider>
      <div className='text-center'>
        <h4 className='text-[16px] font-bold capitalize'>
          {data?.fullName}
        </h4>
        <span>@{data?.username}</span>
      </div>
    </div>
  );

  return (
    <div className='flex flex-col gap-4'>
      {isLoading ? <Loading /> : renderUserDetails()}
      <DialogDescription className={classNames("max-w-[400px] text-center")}>
        {t("admin_form.delete_description")}
      </DialogDescription>
      <DialogFooter className='flex flex-col md:flex-row gap-2 md:gap-0'>
        <Button variant='outline' onClick={handleClose}>
          {t("button.cancel")}
        </Button>
        <Button
          variant='destructive'
          onClick={handleDeleteUser}
          disabled={isLoading}
        >
          {t("button.delete")}
        </Button>
      </DialogFooter>
    </div>
  );
};

export default DeleteUser;
