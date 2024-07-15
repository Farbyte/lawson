export async function uploadPdf(fileUrl: string, fileName: string) {
  let res = await fetch("/api/uploadPdf", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fileUrl,
      fileName,
    }),
  });

  let { success, id } = await res.json();
}
