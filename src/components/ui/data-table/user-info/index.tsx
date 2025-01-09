import React from "react";
import { Eye } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { PhotoProvider, PhotoView } from "react-photo-view";

import "./style.css";
import noUser from "@/assets/icons/no-user.svg";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface User {
  _id?: string;
  profilePhoto?: string;
  fullName?: string;
  username?: string;
}

interface DataTableUserInfoProps {
  row: { original: User };
  accessorKey: "fullName";
}

const DataTableUserInfo: React.FC<DataTableUserInfoProps> = ({
  row,
  accessorKey,
}) => {
  const user = row.original;
  const location = useLocation();

  const pathname = location.pathname;
  const path = pathname.split("/")[pathname.split("/").length - 1];

  // Handle image error and set fallback icon
  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    e.currentTarget.src = noUser; // Set fallback icon if image is broken or invalid
  };

  return (
    <div className='flex items-center gap-2'>
      <PhotoProvider>
        <div className='w-12 h-12'>
          <AspectRatio ratio={16 / 9}>
            <PhotoView src={user?.profilePhoto}>
              <div className='relative cursor-pointer eye_wrapper'>
                <Eye className='absolute z-2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white eye w-5 h-5' />
                <img
                  src={user?.profilePhoto}
                  alt={user[accessorKey] || "User"}
                  className='rounded-full object-cover bg-[#f1f1f1] w-12 h-12'
                  onError={handleImageError} // Trigger handleImageError on image load failure
                />
              </div>
            </PhotoView>
          </AspectRatio>
        </div>
      </PhotoProvider>
      <div>
        <Link to={`/list/${path}/${user?._id}`}>
          <h4 className='text-[16px] font-bold capitalize hover:underline hover:text-blue-500'>
            {user?.fullName}
          </h4>
        </Link>
        <span>@{user?.username}</span>
      </div>
    </div>
  );
};

export default DataTableUserInfo;
