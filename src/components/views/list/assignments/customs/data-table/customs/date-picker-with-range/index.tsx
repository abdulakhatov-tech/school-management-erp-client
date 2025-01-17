import * as React from "react";
import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { useSearchParams } from "react-router-dom";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function DatePickerWithRange({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const [searchParams, setSearchParams] = useSearchParams();
  const startDateParam = searchParams.get("startDate");
  const dueDateParam = searchParams.get("dueDate");

  const initialStartDate = startDateParam ? new Date(startDateParam) : new Date();
  const initialDueDate = dueDateParam ? new Date(dueDateParam) : addDays(initialStartDate, 20);

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: initialStartDate,
    to: initialDueDate,
  });

  const handleDateChange = (range: DateRange | undefined) => {
    if (range?.from) {
      searchParams.set("startDate", format(range.from, "yyyy-MM-dd"));
    } else {
      searchParams.delete("startDate");
    }

    if (range?.to) {
      searchParams.set("dueDate", format(range.to, "yyyy-MM-dd"));
    } else {
      searchParams.delete("dueDate");
    }

    setSearchParams(searchParams);
    setDate(range);
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleDateChange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default DatePickerWithRange;
