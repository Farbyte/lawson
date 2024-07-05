import { NextResponse } from 'next/server';
import prisma from '@/utils/prisma';
import { getAuth } from '@clerk/nextjs/server';

export async function POST(request: Request) {
  const { fileUrl, fileName} = await request.json();

  const { userId } = getAuth(request as any);

  if (!userId) {
    return NextResponse.json({ success: 'false', id : 'None'});
  }

  const doc = await prisma.document.create({
    data: {
      fileName,
      fileUrl,
      userId,
    },
  });
  
  const namespace = doc.id;

  console.log("added to prisma ",namespace)
  console.log(fileUrl)

  return NextResponse.json({
    success: 'true',
    id: namespace,
  });
}