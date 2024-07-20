import { Doc } from "../_chat_components/navbar-comp/NavSidebar";

export const fetchSummary = async (
  type: "large" | "small" | "custom",
  prompt: string,
  setIsLoadingSummary: React.Dispatch<React.SetStateAction<boolean>>,
  setMarkdownContent: React.Dispatch<React.SetStateAction<string>>,
  setError: React.Dispatch<React.SetStateAction<string>>,
  currentDoc: Doc,
) => {
  setIsLoadingSummary(true);
  try {
    const response = await fetch(`/api/summary`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fileUrl: currentDoc.fileUrl,
        type: type,
        prompt: prompt,
        doc : currentDoc
      }),
    });
    if (response.ok) {
      const data = await response.json();
      setMarkdownContent(data.result);
    } else {
      setError("Failed to fetch summary");
    }
  } catch (e) {
    setError("Failed to fetch summary");
  } finally {
    setIsLoadingSummary(false);
  }
};
