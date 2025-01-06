import React from "react";
import { useField } from "formik";
import classNames from "classnames";

import Loading from "./loading";
import { Label } from "@/components/ui/label";

interface PropsI {
  label: string;
  name: string;
  loading?: boolean;
  placeholder?: string;
}

const formatDate = (date: string | Date | null) => {
  if (!date) return ""; // Handle empty values
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const DateField: React.FC<PropsI> = (props) => {
  const [field, meta, helpers] = useField(props);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = event.target.value;
    helpers.setValue(dateValue);
  };

  return (
    <div>
      <Label
        htmlFor={field.name}
        className={classNames("text-base font-normal", {
          "text-[#fc8181]": meta.touched && meta.error,
        })}
      >
        {" "}
        {props.label}
      </Label>
      {props?.loading ? (
        <Loading />
      ) : (
        <div className='relative'>
          <input
            {...field}
            {...props}
            id={field.name}
            type='date'
            value={formatDate(field.value)}
            onChange={handleDateChange}
            className={classNames(
              "h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
              {
                "input-error focus-visible:ring-transparent":
                  meta.touched && meta.error,
              }
            )}
          />
        </div>
      )}

      {meta.touched && meta.error ? (
        <span className='error'>{meta.error}</span>
      ) : null}
    </div>
  );
};

export default DateField;
