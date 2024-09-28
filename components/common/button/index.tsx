import React from "react";
import { Button as Btn } from "@/components/ui/button";

interface Props {
  children: React.ReactNode;
  func: () => void;
}

const Button = ({ children, func }: Props) => {
  return (
    <Btn
      className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-indigo-500 hover:to-blue-600 shadow whitespace-nowrap flex items-center gap-1 font-medium"
      onClick={func}
    >
      {children}
    </Btn>
  );
};

export default Button;
