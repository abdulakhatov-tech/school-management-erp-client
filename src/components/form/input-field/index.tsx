import React, { useState } from "react";
import { useField } from "formik";
import classNames from "classnames";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import Loading from "./loading";

interface PropsI {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  loading?: boolean;
}

const InputField: React.FC<PropsI> = (props) => {
  const [field, meta] = useField(props);
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordField = props.type === "password";
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div>
      <Label
        htmlFor={field.name}
        className={classNames("text-base font-normal", {
          "text-[#fc8181]": meta.touched && meta.error,
        })}
      >
        {props.label}
      </Label>
      {props?.loading ? (
        <Loading />
      ) : (
        <div className='relative'>
          <Input
            {...field}
            {...props}
            id={field.name}
            type={isPasswordField && showPassword ? "text" : props.type}
            className={classNames({
              "input-error focus-visible:ring-transparent placeholder:text-[#fc8181]":
                meta.touched && meta.error,
            })}
          />
          {isPasswordField && (
            <div
              onClick={togglePasswordVisibility}
              className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500'
            >
              {showPassword ? (
                <IoMdEyeOff className='w-6 h-6' />
              ) : (
                <IoMdEye className='w-6 h-6' />
              )}
            </div>
          )}
        </div>
      )}

      {meta.touched && meta.error ? (
        <span className='error'>{meta.error}</span>
      ) : null}
    </div>
  );
};

export default InputField;
