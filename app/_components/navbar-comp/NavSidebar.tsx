import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AlignLeft } from "lucide-react";

export default function NavSidebar() {
  return (
    <>
      <Sheet>
        <SheetTrigger>
          <AlignLeft />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetDescription className="mt-[60px] flex flex-col items-center justify-center">
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
              <div className="mt-4 flex justify-center absolute bottom-4 left-0 right-0">
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
}
