

export async function vectorStore(fileUrl: string, docId: string,isLarge : boolean) {
  
  let res = await fetch("/api/vectorStore", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fileUrl,
      docId,
      isLarge,
    }),
  });

  let { success, id } = await res.json();
}
