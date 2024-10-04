import React from "react";

import { DollarSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { convertToVND } from "@/utils/helper";

export interface IListBoxStatistic {
  title: string;
  total: number | null;
  quantity: number;
}

interface Props {
  statistics: IListBoxStatistic[];
}

const ListBoxStatistic2 = ({ statistics }: Props) => {
  return (
    <div className="flex gap-3 md:gap-5 flex-wrap max-md:flex-col">
      {statistics?.map((statistic) => (
        <Card className="w-full md:w-[250px]" key={statistic.title}>
          <CardContent className="py-5">
            <div className="flex justify-between items-center text-sm">
              <div>{statistic.title}</div>
              <DollarSign className="w-4 h-4 text-gray-500" />
            </div>
            <p className="font-black text-xl mt-1">{convertToVND(statistic.total || 0)}</p>
            <p className="text-xs text-gray-500">{statistic.quantity || 0} đơn</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ListBoxStatistic2;
