"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AlignLeft, Ellipsis, Trash } from "lucide-react";
import { useState } from "react";

interface Document {
  id: string;
  fileName: string;
  fileUrl: string;
  createdAt: Date;
}

export default function NavSidebar({
  initialDocs,
}: {
  initialDocs: Document[];
}) {
  const [docs, setDocs] = useState(initialDocs);

  const truncate = (str: string, length: number, ending = "...") =>
    `${
      str.length > length ? str.slice(0, length - ending.length) + ending : str
    }`;

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
            <SheetDescription className="mt-[80px] flex flex-col gap-5">
              {docs.map((doc) => (
                <>
                  <div className="flex cursor-pointer justify-between rounded-lg p-3 text-white hover:bg-[#212121]">
                    <button key={doc.id} className="">
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
                </>
              ))}
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
}
