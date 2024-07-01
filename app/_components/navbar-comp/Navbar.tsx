import { AlignLeft, SquarePen } from "lucide-react";
import NavSidebar from "./NavSidebar";

export default function Navbar() {
  return (
    <nav className="mx-5 mt-6 flex justify-between">
      <button type="button">
        <NavSidebar />
      </button>
      <button type="button" className="text-bold">
        lawson.
      </button>
      <button type="button">
        <SquarePen />
      </button>
    </nav>
  );
}
