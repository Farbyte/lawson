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

async function fastEmbedder(docId:string,url : string) {
  try{
    const api_key =  process.env.EM_API_KEY
    const res = await fetch(
      `${process.env.EMBEDDER_URL as string}?url=${url}&docId=${docId}&api_key=${api_key}`,{
      method : 'POST',
      headers: {
        "Content-type": "application/json",
      },
      body: ''
    })

    if(res.ok){
      const data = await res.json()
      console.log(data)
      return true
    }
    else{
      console.log(res)
    }
    return false
  }
  catch(e){
    console.log('encountered error : ' + e)
    return false
  }
}

export async function POST(request: Request) {
  const { fileUrl, fileName } = await request.json();

  const { userId } = getAuth(request as any);

  if (!userId) {
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

  // Using Fast embedder for large file 
  if (tokens > maxTokens) {
    console.log("max tokens exceeded");
    const res = await fastEmbedder(namespace,fileUrl)
    if(res){
      const updated = await prisma.document.update({
        where : {
          id : namespace,
        },
        data : {
          isLarge : true
        }
      })
      console.log(updated)
    }
  }

  console.log("added to prisma ", namespace);
  console.log(fileUrl);

  return NextResponse.json({
    success: "true",
    id: namespace,
  });
}
