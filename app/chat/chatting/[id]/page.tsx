import prisma from "@/utils/prisma";
import ChatClient from "./ChatClient";
import { currentUser, User } from "@clerk/nextjs/server";
import Navbar from "@/app/_chat_components/navbar-comp/Navbar";

export default async function Page({ params }: { params: { id: string } }) {
  const user: User | null = await currentUser();

  const currentDoc = await prisma.document.findFirst({
    where: {
      id: params.id,
      userId: user?.id,
    },
  });

  if (!currentDoc) {
    return <div>This document was not found</div>;
  }

  return (
    <div>
      <Navbar />
      <ChatClient currentDoc={currentDoc} />
    </div>
  );
}
