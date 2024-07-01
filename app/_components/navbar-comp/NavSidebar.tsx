import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AlignLeft } from "lucide-react";

export default function NavSidebar() {
  return (
    <>
      <Sheet>
        <SheetTrigger><AlignLeft /></SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetDescription className="mt-10">
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
}
