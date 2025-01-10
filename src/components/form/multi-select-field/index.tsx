import classNames from "classnames";
import React, { useState } from "react";
import { useField, useFormikContext } from "formik";

import {
  Select,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from "@/components/ui/select";
import { PropsI } from "./interface";
import LoadingSkeleton from "./loading";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";

const MultiSelectField: React.FC<PropsI> = ({
  name,
  label,
  options,
  loading = false,
  placeholder = "Select",
}) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();
  const selectedOptions: string[] = field.value || [];

  const [searchTerm, setSearchTerm] = useState("");

  const handleSelectChange = (value: string) => {
    const updatedValues = selectedOptions.includes(value)
      ? selectedOptions.filter((option) => option !== value)
      : [...selectedOptions, value];

    setFieldValue(name, updatedValues);
  };

  const getDisplayValue = () =>
    selectedOptions.length > 0
      ? options
          ?.filter((option) => selectedOptions.includes(option.value))
          .map((option) => option.label)
          .join(", ")
      : placeholder;

  // Filter options based on the search term
  const filteredOptions = options?.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      <Select>
        <SelectTrigger
          className={classNames("text-wrap text-left", {
            "input-error focus-visible:ring-transparent placeholder:text-[#fc8181]":
              meta.touched && meta.error,
          })}
        >
          <SelectValue placeholder={getDisplayValue()} />
        </SelectTrigger>
        <SelectContent>
          {/* Search Input */}
          <Input
            type='search'
            placeholder='Search...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='mt-1 mb-2 w-[97%] mx-auto h-8'
          />
          <ScrollArea className='h-[160px]'>
            {loading ? (
            <LoadingSkeleton />
          ) : filteredOptions?.length > 0 ? (
              filteredOptions?.map((option) => (
                <div
                  key={option.value}
                  className='flex items-center px-2 py-1 cursor-pointer'
                  onClick={() => handleSelectChange(option.value)}
                >
                  <Checkbox
                    checked={selectedOptions.includes(option.value)}
                    className='h-4 w-4 cursor-pointer'
                  />
                  <span className='ml-2'>{option.label}</span>
                </div>
              ))
            ) : (
              <div className='px-2 py-1 text-gray-500 text-center'>
                No options found
              </div>
            )}
          </ScrollArea>
        </SelectContent>
      </Select>
      {meta.touched && meta.error ? (
        <p className='mt-1 text-sm text-[#fc8181]'>{meta.error}</p>
      ) : null}
    </div>
  );
};

export default MultiSelectField;
