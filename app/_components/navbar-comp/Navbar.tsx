import { AlignLeft, SquarePen } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="mx-5 mt-6 flex justify-between">
      <button type="button"><AlignLeft /></button>
      <button type="button" className="text-bold">
        lawson.
      </button>
      <button type="button"><SquarePen /></button>
    </nav>
  );
}
