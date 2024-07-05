"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AlignLeft } from "lucide-react";
import { useState } from "react";

interface Document {
  id: string;
  fileName: string;
  fileUrl: string;
  createdAt: Date;
}

export default function NavSidebar({ initialDocs }: { initialDocs: Document[] }) {

  const [docs, setDocs] = useState(initialDocs);

  return (
    <>
      <Sheet>
        <SheetTrigger>
          <AlignLeft />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetDescription className="mt-[60px] flex flex-col items-center justify-center">
              <div>Documents</div>
              {docs.map((doc) => (
                <div key={doc.id}>{doc.fileName}</div>
              ))}
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
}
