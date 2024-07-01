import { AlignLeft, SquarePen } from "lucide-react";
import NavSidebar from "./NavSidebar";
import { UserButton } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <nav className="mx-5 mt-6 flex justify-between">
      <NavSidebar />
      <button type="button" className="text-bold">
        lawson.
      </button>
      <div className="flex items-center gap-6">
        <UserButton />
        <button type="button">
          <SquarePen />
        </button>
      </div>
    </nav>
  );
}
