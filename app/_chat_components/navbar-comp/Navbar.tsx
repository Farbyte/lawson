import NavSidebar from "./NavSidebar";
import { UserButton } from "@clerk/nextjs";
import { currentUser, User } from "@clerk/nextjs/server";
import prisma from "@/utils/prisma";
import NewChat from "./newChat";
import UploadButtonComp from "./UploadButton";
import { ModeToggle } from "./darkModeToggle";
import Link from "next/link";
import { Scale } from "lucide-react";

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
      <div className="flex items-center gap-6 pl-3">
        <NavSidebar initialDocs={docsList} />
        <NewChat />
      </div>
      <Link href="/chat" className="text-bold flex items-center">
        <div className="hidden md:block">lawson.</div>
        <Scale className="md:hidden"/>
      </Link>
      <div className="flex items-center gap-6 pr-3">
        <ModeToggle />
        <UserButton />
        <UploadButtonComp />
      </div>
    </nav>
  );
}
