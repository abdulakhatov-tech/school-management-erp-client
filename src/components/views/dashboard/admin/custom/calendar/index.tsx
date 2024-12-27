import React, { useEffect, useState } from "react";

import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { useSearchParams } from "react-router-dom";

const CalendarComponent: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [date, setDate] = useState<Date | undefined>(new Date());

  console.log(date, 'date')

  useEffect(() => {
    const dateString = searchParams.get("date");
    if (dateString) {
      const parsedDate = new Date(dateString);
      if (!isNaN(parsedDate.getTime())) {
        setDate(parsedDate);
      }
    } else {
      setDate(new Date());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  useEffect(() => {
    if (date) {
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);
        newParams.set("date", date.toISOString().split("T")[0]); // Set date in YYYY-MM-DD format
        return newParams;
      });
    }
  }, [date, setSearchParams]);

  return (
    <Card>
      {/* <h4 className='text-lg font-semibold'>Calendar</h4> */}
      <Calendar
        mode='single'
        selected={date}
        onSelect={setDate}
        className='rounded-md border flex justify-center'
      />
    </Card>
  );
};

export default CalendarComponent;
