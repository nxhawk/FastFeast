import { Check } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";

interface Props {
  title: string;
  id: string;
  value: string;
  handleClick: () => void;
}

const ExpertChangeDate = ({ title, id, value, handleClick }: Props) => {
  return (
    <Button
      variant="ghost"
      className="flex items-center justify-end gap-1 px-2 w-[128px]"
      type="button"
      onClick={handleClick}
    >
      {value === id && <Check className="w-3 h-3" />}
      {title}
    </Button>
  );
};

export default ExpertChangeDate;
