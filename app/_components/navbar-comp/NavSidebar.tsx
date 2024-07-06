"use client";

import { useCategorizedDocs } from "@/app/_hooks/categorizeDocs";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AlignLeft, Trash } from "lucide-react";
import { useState } from "react";

export interface Doc {
  id: string;
  fileName: string;
  fileUrl: string;
  createdAt: Date;
}

export default function NavSidebar({
  initialDocs,
}: {
  initialDocs: Doc[];
}) {
  const [docs, setDocs] = useState(initialDocs);

  const truncate = (str: string, length: number, ending = "...") =>
    `${
      str.length > length ? str.slice(0, length - ending.length) + ending : str
    }`;

  const categorizedDocs = useCategorizedDocs(docs);

  async function deleteDocument(id: string, fileUrl: string) {
    try {
      const res = await fetch("/api/deletePdf", {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          id,
          fileUrl,
        }),
      });

      if (!res.ok) {
        throw new Error("failed to delete document");
      }
      const data = await res.json();
      if (data.error) {
        console.log(data.error);
      } else {
        console.log("Document deleted successfully");
        setDocs(docs.filter((doc) => doc.id !== id));
      }
    } catch (error) {
      console.log("Error deleting pdf", error);
    }
  }

  return (
    <>
      <Sheet>
        <SheetTrigger>
          <AlignLeft />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetDescription className="mt-[80px] flex flex-col gap-10 ">
              {Object.entries(categorizedDocs)
                .filter(([_, docs]) => docs.length > 0)
                .map(([category, docs]) => (
                  <div key={category}>
                    <h3 className="text-xs font-semibold capitalize px-3  text-gray-400">{category}</h3>
                    {docs.map((doc) => (
                      <div
                        key={doc.id}
                        className="flex cursor-pointer justify-between rounded-lg p-3 text-white hover:bg-[#212121]"
                      >
                        <button className="text-md">
                          {truncate(doc.fileName, 20)}
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteDocument(doc.id, doc.fileUrl);
                          }}
                        >
                          <Trash className="h-5 w-5 text-red-300 hover:text-red-600" />
                        </button>
                      </div>
                    ))}
                  </div>
                ))}
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
}
