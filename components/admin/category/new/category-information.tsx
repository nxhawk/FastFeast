import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toSlug } from "@/utils/helper";

interface Props {
  isLoading: boolean;
  name: string;
  slug: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setSlug: React.Dispatch<React.SetStateAction<string>>;
}

const CategoryInformation = ({ isLoading, name, slug, setName, setSlug }: Props) => {
  const handleGenerateSlug = () => {
    setSlug(toSlug(name));
  };

  return (
    <div className="w-full md:w-9/12">
      <Card>
        <CardHeader>
          <CardTitle className="border-b pb-5">Thông tin</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mt-3 flex flex-col gap-8">
            <div className="flex max-md:flex-col justify-between gap-2">
              <Label htmlFor="name" className="md:w-40">
                Tên
              </Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required disabled={isLoading} />
            </div>

            <div className="flex max-md:flex-col justify-between gap-2">
              <Label htmlFor="slug" className="md:w-40">
                Slug
              </Label>
              <div className="flex justify-center gap-2 w-full">
                <Input
                  id="slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="flex-1"
                  disabled={isLoading}
                  required
                />
                <Button variant="secondary" type="button" onClick={handleGenerateSlug} disabled={isLoading}>
                  Generate
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoryInformation;
