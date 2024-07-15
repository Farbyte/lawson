"use client";

import { Plus } from "lucide-react";
import { UploadButton } from "../uploadthing";
import { uploadPdf } from "@/app/_helper_functions/uploadDocs";
import { getLatestDocId } from "@/app/_helper_functions/getLatest";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function UploadButtonComp() {
  const user = useUser();
  const router = useRouter();

  const Uploadbutton = () => (
    <UploadButton
      className="ut-allowed-content:hidden"
      endpoint="pdfUploader"
      content={{
        button({ ready }) {
          if (ready)
            return <Plus className="h-7 w-7 text-black dark:text-white" />;
          else return <Plus className="h-7 w-7 text-black dark:text-white" />;
        },
      }}
      appearance={{ button: "bg-transparent w-6 h-6" }}
      config={{ mode: "auto" }}
      onUploadProgress={(progress) => {
        toast.loading(`Uploading your document, please wait...`);
      }}
      onClientUploadComplete={async (res) => {
        await uploadPdf(res[0].url, res[0].name);
        const userId = user.user?.id;
        const docId = await getLatestDocId(userId);
        toast.success(`Document uploaded successfully!`, { richColors: true });
        router.push(`/chat/summary/${docId}`);
        console.log("Files: ", res[0].url);
        toast.dismiss();
      }}
      onUploadError={(error: Error) => {
        toast.error(`ERROR! ${error.message}`);
      }}
    />
  );

  return (
    <>
      <Uploadbutton />
    </>
  );
}
