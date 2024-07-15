export async function getLatestDocId(userId: string | undefined) {
  let res = await fetch(`/api/getLatestPdf?userId=${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  let { latestDocId, error } = await res.json();

  if (error) {
    throw new Error(error);
  }

  return latestDocId;
}
