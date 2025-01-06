import React, { useState } from "react";
import classNames from "classnames";
import { useField, useFormikContext } from "formik";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

import LoadingSkeleton from "./loading";
import { Input } from "@/components/ui/input";

interface PropsI {
  label: string;
  name: string;
  value: string;
  loading?: boolean;
  disabled?: boolean;
  placeholder?: string;
  searchable?: boolean;
  setState?: (value: any) => void;
  options: { value: string; label: string }[];
}

const SelectField: React.FC<PropsI> = ({
  label,
  name,
  placeholder = "Select...",
  options,
  setState,
  loading,
  searchable = false,
  ...props
}) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();
  const [searchTerm, setSearchTerm] = useState("");

  // Filter options based on the search term
  const filteredOptions = options?.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Label
        htmlFor={name}
        className={classNames("text-base font-normal", {
          "text-[#fc8181]": meta.touched && meta.error,
        })}
      >
        {label}
      </Label>
      <Select
        {...props}
        onValueChange={(value) => {
          setFieldValue(name, value);
          if (setState) {
            setState(value);
          }
        }} 
        defaultValue={field.value}
        disabled={props.disabled}
      >
        <SelectTrigger
          className={classNames("w-full", {
            "input-error focus-visible:ring-transparent":
              meta.touched && meta.error,
          })}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {/* Search Input */}
          {searchable && (
            <Input
              type='search'
              placeholder='Search...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='mt-1 mb-2 w-[97%] mx-auto h-8'
            />
          )}
          {loading ? (
            <LoadingSkeleton />
          ) : filteredOptions?.length > 0 ? (
            filteredOptions?.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))
          ) : (
            <h5 className='p-2 text-center text-sm'>No Data</h5>
          )}
        </SelectContent>
      </Select>
      {meta.touched && meta.error ? (
        <span className='error text-red-500 text-sm'>{meta.error}</span>
      ) : null}
    </div>
  );
};

export default SelectField;
