"use client";

import { useCategorizedDocs } from "@/app/_helper_functions/categorizeDocs";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AlignLeft, Trash } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";

export interface Doc {
  id: string;
  userId: string;
  fileUrl: string;
  fileName: string;
  createdAt: Date;
  isLarge: boolean;
}

export default function NavSidebar({ initialDocs }: { initialDocs: Doc[] }) {
  const [docs, setDocs] = useState(initialDocs);
  const [isReady, setReady] = useState(true);
  const router = useRouter();
  const params = useParams<{id : string}>();

  const truncate = (str: string, length: number, ending = "...") =>
    `${
      str.length > length ? str.slice(0, length - ending.length) + ending : str
    }`;

  const categorizedDocs = useCategorizedDocs(docs);

  async function deleteDocument(id: string, fileUrl: string) {
    if (!isReady) {
      console.log("DELETE ERROR : ALREADY DELETING");
      return;
    }
    setReady(false);
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
        throw new Error("Failed to delete document");
      }
      const data = await res.json();
      if (data.error) {
        console.log(data.error);
      } else {
        console.log("Document deleted successfully");
        setDocs(docs.filter((doc) => doc.id !== id));
        setReady(true);
        if (params && params.id === id) {
          router.push("/chat");
        }
      }
    } catch (error) {
      console.log("Error deleting pdf", error);
    } finally {
      setReady(true);
    }
  }

  return (
    <>
      <Sheet>
        <SheetTrigger>
          <AlignLeft />
        </SheetTrigger>
        <SheetContent>
          <div className="mt-[80px] flex flex-col gap-10">
            {Object.entries(categorizedDocs)
              .filter(([_, docs]) => docs.length > 0)
              .map(([category, docs]) => (
                <div key={category}>
                  <div className="px-3 text-xs font-semibold capitalize text-gray-400">
                    {category}
                  </div>
                  {docs.map((doc) => (
                    <div
                      key={doc.id}
                      onClick={() => {
                        router.push(`/chat/summary/${doc.id}`);
                      }}
                      className="flex cursor-pointer justify-between rounded-lg p-3 text-black hover:bg-[#E5E7EB] dark:text-white dark:hover:bg-[#212121]"
                    >
                      <button className="text-md">
                        {truncate(doc.fileName, 20)}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteDocument(doc.id, doc.fileUrl);
                          toast.success(`Deleted ${doc.fileName}`, {
                            richColors: true,
                          });
                        }}
                      >
                        <Trash className="h-5 w-5 text-red-400 hover:text-red-600" />
                      </button>
                    </div>
                  ))}
                </div>
              ))}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
