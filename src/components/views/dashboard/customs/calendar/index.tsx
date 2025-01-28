import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";

const CalendarComponent: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [date, setDate] = useState<Date | undefined>(new Date());

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
        newParams.set("date", date.toISOString().split("T")[0]); 
        return newParams;
      });
    }
  }, [date, setSearchParams]);

  return (
    <Card>
      {/* <CardTitle className='text-lg font-semibold mb-2'>
        {t("admin_dashboard.calendar", "Calendar")}
      </CardTitle> */}
      <Calendar
        mode='single'
        selected={date}
        onSelect={setDate}
        className='rounded-md border flex justify-center'
        captionLayout='dropdown-buttons'
        fromYear={1980}
        toYear={new Date().getFullYear() + 10}
      />
    </Card>
  );
};

export default CalendarComponent;
