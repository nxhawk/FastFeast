import React from "react";

interface Props {
  value: string;
  setValue: (value: string) => void;
  placeholder?: string;
  icon: React.ReactNode;
}

const TextareaHeader = ({ value, setValue, icon, placeholder = "" }: Props) => {
  return (
    <div className="relative w-full">
      <div className="absolute h-10 aspect-square top-0 left-0 flex items-center justify-center">{icon}</div>
      <textarea
        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 pl-10 text-base leading-normal"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      ></textarea>
    </div>
  );
};

export default TextareaHeader;
