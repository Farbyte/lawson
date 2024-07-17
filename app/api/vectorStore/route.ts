import { NextResponse } from "next/server";
import { loadVectorStore } from "@/app/api/utils/vector_store";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { loadEmbeddingsModel } from "@/app/api/utils/embeddings";
import { getAuth } from "@clerk/nextjs/server";
import { Pinecone } from "@pinecone-database/pinecone";

export const maxDuration = 60;

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY as string,
});

export async function POST(req: Request) {
  console.log("Func called");
  const { fileUrl, docId, isLarge } = await req.json();
  const { userId } = await getAuth(req as any);
  console.log("user id to hai");
  // if (!userId) {
  //   console.log("user id nai hai");
  //   return NextResponse.json({
  //     error: "please sign in to add doc",
  //   });
  // }

  const utfsUrl = fileUrl.split("/")[0];
  const fileName = fileUrl.replace(`${utfsUrl}\f`, "");
  // New namespace for large file
  const addON = isLarge ? "Large" : "";
  const namespace = docId + addON;

  // Check if we already have embeddings for the file
  const index = pinecone.Index(process.env.PINECONE_INDEX_NAME as string);
  const stats = await index.describeIndexStats();
  if (stats && stats.namespaces && namespace in stats.namespaces) {
    return NextResponse.json({
      text: "embeddings already present",
      id: namespace,
      isLarge: isLarge,
    });
  }
  console.log("doc hai = ", namespace);
  try {
    const response = await fetch(fileUrl);
    const buffer = await response.blob();
    const loader = new PDFLoader(buffer);
    const rawDocs = await loader.load();
    console.log(namespace);
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });
    const splitDocs = await textSplitter.splitDocuments(rawDocs);
    console.log("creating vector store ....");
    const embeddings = loadEmbeddingsModel();
    console.log("loading embedding store ....");
    console.log("namepsace : " + namespace + addON);
    const store = await loadVectorStore({
      namespace: namespace + addON,
      embeddings,
    });
    console.log("store ....");
    const vectorStore = store.vectorstore;
    console.log("store .... 1 ");
    await vectorStore.addDocuments(splitDocs);
    console.log("done");
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ error: "failed to add docs to pinecone" });
  }

  return NextResponse.json({
    text: "successfully added to pinecone",
    id: namespace,
    isLarge: isLarge,
  });
}
