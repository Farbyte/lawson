import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { getAuth } from "@clerk/nextjs/server";
import { ChatTogetherAI } from "@langchain/community/chat_models/togetherai";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { UTApi } from "uploadthing/server";

async function uploadThingDelete(fileUrl: string) {
  const utapi = new UTApi();
  const utfsUrl = fileUrl.split("/")[0];
  const fileName = fileUrl.replace(`${utfsUrl}\f`, "");
  await utapi.deleteFiles(fileName);
  console.log("deleted from uploadthing");
}

export async function POST(request: Request) {
  const { fileUrl, fileName } = await request.json();

  const { userId } = getAuth(request as any);

  if (!userId) {
    return NextResponse.json({ success: "false", id: "None" });
  }

  const model = new ChatTogetherAI({
    modelName: "mistralai/Mistral-7B-Instruct-v0.3",
    apiKey: process.env.TO_API_KEY,
    temperature: 0,
  });

  const pdfile: any = await fetch(fileUrl);
  const loder = new PDFLoader(pdfile, {
    splitPages: false,
    parsedItemSeparator: "",
  });

  const docs = await loder.load();
  const text = docs[0].pageContent;
  const maxTokens = 30000;
  const tokens = await model.getNumTokens(text);
  console.log(`tokens : ${tokens} maxTokens : ${maxTokens}`);

  if (tokens > maxTokens) {
    console.log("max tokens exceeded");
    console.log("deleting from uploadthing ", fileUrl);
    await uploadThingDelete(fileUrl);
    return NextResponse.json({ success: "false", id: "None" });
  }

  const doc = await prisma.document.create({
    data: {
      fileName,
      fileUrl,
      userId,
    },
  });

  const namespace = doc.id;

  console.log("added to prisma ", namespace);
  console.log(fileUrl);

  return NextResponse.json({
    success: "true",
    id: namespace,
  });
}
