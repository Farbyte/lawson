"use client";

import { SquarePen } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NewChat() {
  const router = useRouter();
  return (
    <button type="button" onClick={() => router.push("/chat")}>
      <SquarePen className="h-5 w-5" />
    </button>
  );
}
