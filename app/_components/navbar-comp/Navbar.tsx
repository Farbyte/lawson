import NavSidebar from "./NavSidebar";
import { UserButton } from "@clerk/nextjs";
import { currentUser, User } from "@clerk/nextjs/server";
import prisma from "@/utils/prisma";
import NewChat from "./newChat";
import UploadButtonComp from "./UploadButton";

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
      <div className="flex items-center gap-6">
        <NavSidebar initialDocs={docsList} />
        <NewChat />
      </div>
      <button type="button" className="text-bold">
        lawson.
      </button>
      <div className="flex items-center gap-6">
        <UserButton />
        <UploadButtonComp />
      </div>
    </nav>
  );
}
