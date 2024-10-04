"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { type DateRange } from "react-day-picker";

import ListQuickSelectDate from "./list-quick-select-date";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { formateDateSearchParam } from "@/utils/helper";

export function SelectDate({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [quickButtonSelected, setQuickButtonSelected] = React.useState("");
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(),
  });

  const handleChangeDate = (e: DateRange | undefined) => {
    setDate(e);
    const params = new URLSearchParams(searchParams);
    if (e?.from && e?.to) {
      params.set("from", formateDateSearchParam(e.from));
      params.set("to", formateDateSearchParam(e.to));
    } else {
      params.delete("from");
      params.delete("to");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn("w-[300px] justify-start text-left font-normal", !date && "text-muted-foreground")}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "d/MM, y").replace("/", " thg ")} -{" "}
                  {format(date.to, "d/MM, y").replace("/", " thg ")}
                </>
              ) : (
                format(date.from, "d/MM, y").replace("/", " thg ")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="flex gap-1">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={(e) => handleChangeDate(e)}
              numberOfMonths={2}
            />
            <div className="max-md:hidden">
              <ListQuickSelectDate
                value={quickButtonSelected}
                setValue={setQuickButtonSelected}
                handleChangeDate={handleChangeDate}
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
