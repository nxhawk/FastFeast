import React from "react";
import { Button as Btn } from "@/components/ui/button";

interface Props {
  children: React.ReactNode;
}

const Button = ({ children }: Props) => {
  return (
    <Btn className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-indigo-500 hover:to-blue-600 shadow whitespace-nowrap">
      {children}
    </Btn>
  );
};

export default Button;
