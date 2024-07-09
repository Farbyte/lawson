import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { getAuth } from "@clerk/nextjs/server";
import { UTApi } from "uploadthing/server";
import { Pinecone } from "@pinecone-database/pinecone";

export async function DELETE(req: Request) {
  console.log("DELETE CALLED");

  const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY as string,
  });

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

    console.log("deleting pinecone namespace");
    const index = pinecone.index(process.env.PINECONE_INDEX_NAME as string);
    try {
      await index.namespace(id).deleteAll();
    } catch (e) {
      console.log(e);
    }

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
