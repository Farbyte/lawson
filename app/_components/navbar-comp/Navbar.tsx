import { AlignLeft, Link, SquarePen } from "lucide-react";
import NavSidebar from "./NavSidebar";
import { UserButton } from "@clerk/nextjs";
import { currentUser, User } from "@clerk/nextjs/server";
import prisma from "@/utils/prisma";
import NewChat from "./newChat";

export default async function Navbar() {
  const user: User | null = await currentUser();

  const docsList = await prisma.document.findMany({
    where: {
      userId: user?.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <nav className="mx-5 mt-6 flex justify-between">
      <NavSidebar initialDocs={docsList} />
      <button type="button" className="text-bold">
        lawson.
      </button>
      <div className="flex items-center gap-6">
        <UserButton />
        <NewChat />
      </div>
    </nav>
  );
}
