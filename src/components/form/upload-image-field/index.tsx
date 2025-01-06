import classNames from "classnames";
import { IoIosCamera } from "react-icons/io";
import { useField, useFormikContext } from "formik";
import React, { useEffect, useRef, useState } from "react";

import Loading from "./loading";
import useAxiosInstance from "@/api";
import { LoadingSpinner } from "@/tools";
import { toast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import noUser from "@/assets/icons/no-user.svg";
import noImage from "@/assets/images/no-image.png";

interface UploadImageFieldPropsI {
  label: string;
  name: string;
  loading?: boolean;
}

const ImageUploadField: React.FC<UploadImageFieldPropsI> = ({
  label,
  loading,
  ...props
}) => {
  const $axios = useAxiosInstance();
  const [field, meta] = useField(props);
  const { setFieldValue } = useFormikContext();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(field.value || null);

  const handleIconClick = () => {
    inputRef.current?.click();
  };

  useEffect(() => {
    if (field.value && field.value !== preview) {
      setPreview(field.value);
    }
  }, [field.value, preview]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      toast({
        variant: "destructive",
        title: "No file selected.",
      });
      return;
    }

    setUploading(true);

    try {
      // Show preview immediately
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string); // Set preview image
      };
      reader.readAsDataURL(file);

      // Upload to server
      const formData = new FormData();
      formData.append("image", file);

      const response = await $axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/upload/image`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const { imgUrl } = response.data;

      // Update Formik field value
      setFieldValue(field.name, imgUrl);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to upload image.",
        description: "Please check your connection and try again.",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <Label
        htmlFor={field.name}
        className={classNames("text-base font-normal", {
          "text-[#fc8181]": meta.touched && meta.error,
        })}
      >
        {label}
      </Label>

      {loading ? (
        <Loading />
      ) : (
        <div className='flex items-center'>
          <div className='relative'>
            <img
              src={preview ? preview : field.name !== 'imgUrl' ?  noUser : noImage}
              className={classNames(
                "object-cover rounded-full w-[100px] h-[100px] md:w-[120px] md:h-[120px] border border-solid",
                {
                  "input-error focus-visible:ring-transparent":
                    meta.touched && meta.error,
                  "border-[#D9D9D9] focus:border-[#D9D9D9]":
                    !meta.touched && !meta.error,
                }
              )}
              alt='Uploaded Preview'
            />
            <div
              onClick={handleIconClick}
              className={classNames(
                "flex items-center justify-center absolute -right-0 bottom-1 z-10 w-7 h-7 rounded-full overflow-hidden bg-[#F6F6F6] custom-shadow",
                {
                  "input-error focus-visible:ring-transparent":
                    meta.touched && meta.error,
                }
              )}
            >
              {uploading ? (
                <LoadingSpinner className='text-[20px] text-black' size='sm' />
              ) : (
                <IoIosCamera className='text-[22px] text-[#6C6C6C]' />
              )}
            </div>
            <Input
              ref={inputRef}
              type='file'
              name={field.name}
              onChange={handleImageChange}
              className='hidden'
              accept='image/jpeg, image/png, image/gif'
            />
          </div>
        </div>
      )}

      {meta.touched && meta.error ? (
        <span className='error'>{meta.error}</span>
      ) : null}
    </div>
  );
};

export default ImageUploadField;
