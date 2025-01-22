import React from "react";
import { Eye } from "lucide-react";
import { PhotoProvider, PhotoView } from "react-photo-view";

import "./style.css";
import noUser from "@/assets/icons/no-user.svg";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

interface Subject {
  _id: string;
  imgUrl: string;
  name: string;
}

interface SubjectInfoProps {
  row: { original: Subject };
  accessorKey: "name";
}

const SubjectInfo: React.FC<SubjectInfoProps> = ({ row, accessorKey }) => {
  const { t } = useTranslation();
  const subject = row.original;
  
  const [searchParams, setSearchParams ] = useSearchParams();

  // Handle image error and set fallback icon
  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    e.currentTarget.src = noUser; // Set fallback icon if image is broken or invalid
  };

  const handleClick = () => {
    setSearchParams({...searchParams, subjectId: subject._id }); 
  }

  return (
    <div className='flex items-center gap-3'>
      <PhotoProvider>
        <div className='w-12 h-12'>
          <AspectRatio ratio={16 / 9}>
            <PhotoView src={subject?.imgUrl}>
              <div className='relative cursor-pointer eye_wrapper'>
                <Eye className='absolute z-2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white eye w-5 h-5' />
                <img
                  src={subject?.imgUrl}
                  alt={subject[accessorKey] || "Subject"}
                  className='rounded-full object-cover bg-[#f1f1f1] w-12 h-12'
                  onError={handleImageError} // Trigger handleImageError on image load failure
                />
              </div>
            </PhotoView>
          </AspectRatio>
        </div>
      </PhotoProvider>
      <div>
        <h4 className='text-[16px] font-bold capitalize' onClick={handleClick}>{t(`subjects.${subject.name}`, subject.name)}</h4>
      </div>
    </div>
  );
};

export default SubjectInfo;
