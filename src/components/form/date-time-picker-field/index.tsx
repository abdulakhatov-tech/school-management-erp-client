import React from "react";
import { format } from "date-fns";
import { useField } from "formik";
import classNames from "classnames";
import { Calendar as CalendarIcon } from "lucide-react";

import Loading from "./loading";
import { cn } from "@/lib/utils";
import { TimePicker } from "./time-picker";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface PropsI {
  label: string;
  name: string;
  loading?: boolean;
}

const DateTimePickerField: React.FC<PropsI> = (props) => {
  const [field, meta, helpers] = useField(props);

  // Update handleTimeChange to handle Date | undefined
  const handleTimeChange = (date: Date | undefined) => {
    if (date) {
      // If the date is valid, update the time on the existing date.
      if (field.value) {
        const newDate = new Date(field.value);
        newDate.setHours(date.getHours(), date.getMinutes());
        helpers.setValue(newDate); // Set the updated value
      } else {
        // If there's no date, just set the new date with time
        helpers.setValue(date);
      }
    } else {
      // If no date is selected, clear the value
      helpers.setValue(undefined);
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
        {props.label}
      </Label>
      {props?.loading ? (
        <Loading />
      ) : (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !field.value && "text-muted-foreground",
                meta.touched && meta.error && "input-error focus-visible:ring-transparent"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {field.value ? format(new Date(field.value), "MMM dd, yyyy hh:mm a") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={field.value ? new Date(field.value) : undefined} // Pass undefined if no date is selected
              onSelect={(date) => helpers.setValue(date)} // Update Formik value on select
              initialFocus
            />
            <div className="p-3 border-t border-border">
              <TimePicker
                date={field.value ? new Date(field.value) : undefined} // Pass date or undefined
                setDate={handleTimeChange} // Now handles Date | undefined
              />
            </div>
          </PopoverContent>
        </Popover>
      )}

      {meta.touched && meta.error ? (
        <span className="error">{meta.error}</span>
      ) : null}
    </div>
  );
};

export default DateTimePickerField;
