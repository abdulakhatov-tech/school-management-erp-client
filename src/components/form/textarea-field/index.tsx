import React from "react";
import { useField } from "formik";
import classNames from "classnames";

import Loading from "./loading";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface PropsI {
  name: string;
  label: string;
  rows?: number;
  loading?: boolean;
  placeholder?: string;
}

const TextareaField: React.FC<PropsI> = ({ label, ...props }) => {
  const [field, meta] = useField(props);

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

      {props?.loading ? (
        <Loading rows={props.rows} />
      ) : (
        <Textarea
          {...field}
          {...props}
          id={field.name}
          className={classNames({
            "input-error focus-visible:ring-transparent placeholder:text-[#fc8181]":
              meta.touched && meta.error,
          })}
        />
      )}

      {meta.touched && meta.error ? (
        <span className='error'>{meta.error}</span>
      ) : null}
    </div>
  );
};

export default TextareaField;
