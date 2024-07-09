import { Embeddings } from "@langchain/core/embeddings";
import { loadPineconeStore } from "./pinecone";
import { Callbacks } from "@langchain/core/callbacks/manager";

export async function loadVectorStore({
  namespace,
  embeddings,
}: {
  namespace: string;
  embeddings: Embeddings;
}) {
  return await loadPineconeStore({
    namespace,
    embeddings,
  });
}

export async function loadRetriever({
  embeddings,
  chatId,
  callbacks,
}: {
  embeddings: Embeddings;
  chatId: string;
  callbacks?: Callbacks;
}) {
  const store = await loadVectorStore({
    namespace: chatId,
    embeddings,
  });
  const vectorstore = store.vectorstore;
  const retriever = vectorstore.asRetriever({
    callbacks,
  });
  return {
    retriever,
  };
}
