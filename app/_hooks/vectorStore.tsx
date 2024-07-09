export async function vectorStore(fileUrl: string, docId: string) {
  let res = await fetch("/api/vectorStore", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fileUrl,
      docId,
    }),
  });

  let { success, id } = await res.json();
}
