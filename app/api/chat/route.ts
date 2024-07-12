import { NextRequest, NextResponse } from "next/server";
import type { Message as VercelChatMessage } from "ai";
import { createRAGChain } from "@/utils/ragChain";
import type { Document } from "@langchain/core/documents";
import { HumanMessage, AIMessage, ChatMessage } from "@langchain/core/messages";
import { loadRetriever } from "@/app/api/utils/vector_store";
import { loadEmbeddingsModel } from "@/app/api/utils/embeddings";
import { ChatTogetherAI } from "@langchain/community/chat_models/togetherai";
import { getAuth } from "@clerk/nextjs/server";

export const runtime = "edge";

const formatVercelMessages = (message: VercelChatMessage) => {
  if (message.role === "user") {
    return new HumanMessage(message.content);
  } else if (message.role === "assistant") {
    console.log("message.content", message.content);
    return new AIMessage(message.content);
  } else {
    console.warn(
      `Unknown message type passed: "${message.role}". Falling back to generic message type.`,
    );
    return new ChatMessage({ content: message.content, role: message.role });
  }
};

export async function POST(req: NextRequest) {
  try {
    const user = getAuth(req);
    if (!user) {
      return NextResponse.json({
        error: "Please sign in",
      });
    }

    const body = await req.json();
    const messages = body.messages ?? [];
    if (!messages.length) {
      throw new Error("No messages provided.");
    }
    console.log('message formater called...')
    const formattedPreviousMessages = messages
      .slice(0, -1)
      .map(formatVercelMessages);
    const currentMessageContent = messages[messages.length - 1].content;
    // New Namespace for large files
    const isLarge = body.isLarge
    const addON = isLarge ? 'Large' : ''
    const chatId = body.chatId+addON;
    
    console.log('chatID' + chatId)
    console.log('format messages completed ... ')
    const model = new ChatTogetherAI({
      modelName: "mistralai/Mistral-7B-Instruct-v0.3",
      apiKey: process.env.TO_API_KEY,
      temperature: 0,
    });

    const embeddings = loadEmbeddingsModel();
    
    let resolveWithDocuments: (value: Document[]) => void;
    const documentPromise = new Promise<Document[]>((resolve) => {
      resolveWithDocuments = resolve;
    });

    const retrieverInfo = await loadRetriever({
      chatId,
      embeddings,
      callbacks: [
        {
          handleRetrieverEnd(documents) {
            // Extract retrieved source documents so that they can be displayed as sources
            // on the frontend.
            resolveWithDocuments(documents);
          },
        },
      ],
    });

    const retriever = retrieverInfo.retriever;

    const ragChain = await createRAGChain(model, retriever);
    console.log('rag chain called... ')
    const stream = await ragChain.stream({
      input: currentMessageContent,
      chat_history: formattedPreviousMessages,
    });
    console.log('rag chain end....')
    const documents = await documentPromise;

    const serializedSources = Buffer.from(
      JSON.stringify(
        documents.map((doc) => {
          return {
            pageContent: doc.pageContent.slice(0, 50) + "...",
            metadata: doc.metadata,
          };
        }),
      ),
    ).toString("base64")
    //Convert to bytes so that we can pass into the HTTP response
    console.log('bytestream called...')
    const byteStream = stream.pipeThrough(new TextEncoderStream());
    console.log('bytestream end...')

    return new Response(byteStream, {
      headers: {
        "x-message-index": (formattedPreviousMessages.length + 1).toString(),
        "x-sources": serializedSources,
      },
    });
  } catch (e: any) {
    console.error("Error processing request:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
