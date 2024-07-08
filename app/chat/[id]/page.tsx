import prisma from '@/utils/prisma';
import ChatClient from './ChatClient';
import { currentUser, User } from '@clerk/nextjs/server';

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
      <ChatClient currentDoc={currentDoc} />
    </div>
  );
}