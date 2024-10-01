import React from "react";

interface Props {
  value: string;
  setValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  icon: React.ReactNode;
}

const InputHeader = ({ value, setValue, icon, placeholder = "" }: Props) => {
  return (
    <div className="relative w-full">
      <div className="absolute h-full aspect-square top-0 left-0 flex items-center justify-center">{icon}</div>
      <input
        className="flex w-full rounded-md border border-input bg-transparent px-3 py-1 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 h-10 pl-10 text-base leading-normal"
        placeholder={placeholder}
        value={value}
        onChange={setValue}
      />
    </div>
  );
};

export default InputHeader;
