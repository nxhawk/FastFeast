import React from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  data: string | object;
  fileName: string;
}

const ExportCSV = ({ data, fileName }: Props) => {
  const convertToCSV = (objArray: string | object) => {
    const array = typeof objArray !== "object" ? JSON.parse(objArray) : objArray;
    let str = "";

    for (const obj of array) {
      let line = "";
      for (const index in obj) {
        if (line !== "") line += ",";

        line += obj[index];
      }
      str += line + "\r\n";
    }
    return str;
  };

  const downloadCSV = () => {
    const csvData = new Blob([convertToCSV(data)], { type: "text/csv" });
    const csvURL = URL.createObjectURL(csvData);
    const link = document.createElement("a");
    link.href = csvURL;
    link.download = `${fileName}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button variant="outline" className="flex items-center gap-2" onClick={downloadCSV}>
      <Download className="w-4 h-4" />
      Export
    </Button>
  );
};

export default ExportCSV;
