"use client";
import React from "react";
import { Check } from "lucide-react";
import { type DateRange } from "react-day-picker";
import {
  subDays,
  addDays,
  startOfWeek,
  subWeeks,
  lastDayOfWeek,
  startOfMonth,
  lastDayOfMonth,
  subMonths,
} from "date-fns";
import ExpertChangeDate from "./expert-change-date";
import { Button } from "@/components/ui/button";

const options = [
  {
    key: "now",
    name: "Hôm nay",
    value: 0,
  },
  {
    key: "yesterday",
    name: "Hôm qua",
    value: -1,
  },
  {
    key: "7-days-ago",
    name: "7 ngày trước",
    value: -7,
  },
  {
    key: "14-days-ago",
    name: "14 ngày trước",
    value: -14,
  },
  {
    key: "30-days-ago",
    name: "30 ngày trước",
    value: -30,
  },
];

interface Props {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  handleChangeDate: (e: DateRange | undefined) => void;
}

const ListQuickSelectDate = ({ value, setValue, handleChangeDate }: Props) => {
  const handleChangeDateNormal = (key: string, day: number) => {
    setValue(key);
    let fromDay;
    if (day < 0) {
      fromDay = subDays(new Date(), Math.abs(day));
    } else {
      fromDay = addDays(new Date(), day);
    }

    handleChangeDate({ from: fromDay, to: day === -1 ? fromDay : new Date() });
  };

  const handleSetThisWeek = () => {
    setValue("this-week");
    handleChangeDate({
      from: startOfWeek(new Date(), { weekStartsOn: 1 }),
      to: new Date(),
    });
  };

  const handleSetLastWeek = () => {
    setValue("last-week");
    const from = startOfWeek(subWeeks(new Date(), 1), { weekStartsOn: 1 });
    handleChangeDate({
      from,
      to: lastDayOfWeek(from, { weekStartsOn: 1 }),
    });
  };

  const handleSetThisMonth = () => {
    setValue("this-month");
    handleChangeDate({
      from: startOfMonth(new Date()),
      to: new Date(),
    });
  };

  const handleSetLastMonth = () => {
    setValue("last-month");
    const from = startOfMonth(subMonths(new Date(), 1));
    handleChangeDate({
      from,
      to: lastDayOfMonth(from),
    });
  };

  return (
    <div className="p-4">
      <div className="flex flex-col gap-1">
        {options.map((o) => (
          <Button
            variant="ghost"
            key={o.key}
            className="flex items-center justify-end gap-1 px-2 w-[128px]"
            type="button"
            onClick={() => handleChangeDateNormal(o.key, o.value)}
          >
            {value === o.key && <Check className="w-3 h-3" />}
            {o.name}
          </Button>
        ))}
        <ExpertChangeDate title="Tuần này" id="this-week" value={value} handleClick={handleSetThisWeek} />
        <ExpertChangeDate title="Tuần trước" id="last-week" value={value} handleClick={handleSetLastWeek} />
        <ExpertChangeDate title="Tháng này" id="this-month" value={value} handleClick={handleSetThisMonth} />
        <ExpertChangeDate title="Tháng trước" id="last-month" value={value} handleClick={handleSetLastMonth} />
      </div>
    </div>
  );
};

export default ListQuickSelectDate;
