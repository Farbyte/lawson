import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { getAuth } from "@clerk/nextjs/server";
import { UTApi } from "uploadthing/server";

export async function DELETE(req: Request) {
  console.log("DELETE CALLED");

  const utapi = new UTApi();

  const { id, fileUrl } = await req.json();

  const { userId } = getAuth(req as any);

  if (!userId) {
    return NextResponse.json({ error: "you must be logged in to delete" });
  }
  try {
    const document = await prisma.document.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!document) {
      return NextResponse.json({ error: "Document not found" });
    }

    const utfsUrl = fileUrl.split("/")[0];
    const fileName = fileUrl.replace(`${utfsUrl}\f`, "");
    const utapiRes = await utapi.deleteFiles(fileName);

    const prismaRes = await prisma.document.delete({
      where: {
        id,
      },
    });

    console.log(`userId : ${userId} , file-url : ${fileUrl}, id : ${id}`);
    return NextResponse.json({ text: "Document deleted successfully", id });
  } catch (e) {
    console.log("error", e);
    return NextResponse.json({ error: "Failed to delete your data" });
  }
}
