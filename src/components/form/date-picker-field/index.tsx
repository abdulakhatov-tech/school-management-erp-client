import React from "react";
import { useField } from "formik";
import classNames from "classnames";
import { format, isValid } from "date-fns";
import { CalendarIcon } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Loading from "./loading";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

interface PropsI {
  label: string;
  name: string;
  loading?: boolean;
  placeholder?: string;
}

const DatePickerField: React.FC<PropsI> = ({ label, name, loading, placeholder }) => {
  const [field, meta, helpers] = useField(name);

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      // Convert the Date to ISO string for Formik value
      helpers.setValue(date.toISOString());
    } else {
      helpers.setValue(""); // Clear the value if no date is selected
    }
  };

  return (
    <div>
      <Label
        htmlFor={name}
        className={classNames("text-base font-normal", {
          "text-[#fc8181]": meta.touched && meta.error, // Highlight the label in case of an error
        })}
      >
        {label}
      </Label>
      {loading ? (
        <Loading />
      ) : (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !field.value && "text-muted-foreground", // Placeholder style
                meta.touched &&
                  meta.error &&
                  "input-error focus-visible:ring-transparent" // Error style
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {field.value && isValid(new Date(field.value)) ? (
                format(new Date(field.value), "MMM dd, yyyy") // Safely format valid date
              ) : (
                <span>{placeholder || "Pick a date"}</span> // Show placeholder
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={
                field.value && isValid(new Date(field.value))
                  ? new Date(field.value)
                  : undefined // Ensure valid date is passed
              }
              onSelect={handleDateChange} // Update Formik value on select
              initialFocus
              captionLayout="dropdown-buttons"
              fromYear={1980}
              toYear={new Date().getFullYear() + 10}
            />
          </PopoverContent>
        </Popover>
      )}
      {meta.touched && meta.error && (
        <p className="mt-2 text-sm text-[#fc8181]">{meta.error}</p> // Display error message
      )}
    </div>
  );
};

export default DatePickerField;
