"use client";

import { useState, useRef, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { CornerRightUp, Plus } from "lucide-react";
import { UploadButton } from "../uploadthing";

export const InputComp = () => {
  const [value, setValue] = useState("");
  const [height, setHeight] = useState("40px");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = (event :any) => {
    const textareaLineHeight = 40;
    const { target } = event;
    setValue(target.value);
    setHeight(`${target.scrollHeight}px`);
    
    if (target.value === "") {
      setHeight(`${textareaLineHeight}px`);
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      setHeight(`${textareaRef.current.scrollHeight}px`);
    }
  }, []);

  const Uploadbutton = () => (
    <UploadButton
      className="ut-allowed-content:hidden"
      endpoint="pdfUploader"
      content={{
        button({ ready }) {
          if (ready)
            return (
                <Plus className="h-5 w-5" />
            );
        },
      }}
      appearance={{ button: 'bg-transparent w-6 h-6' }}
      config={{ mode: 'auto' }}
      onClientUploadComplete={(res) => {
        console.log('Files: ', res[0].url);
      }}
      onUploadError={(error: Error) => {
        alert(`ERROR! ${error.message}`);
      }}
    />
  );

  return (
    <div className="flex items-center justify-center">
      <div className="fixed bottom-6 w-full max-w-2xl">
        <form className="relative m-auto flex items-center gap-5 overflow-y-auto rounded-[26px] bg-[#2F2F2F] px-3 text-base md:px-5 lg:px-1 xl:px-5">
          {/* <button type="button">
            <Plus />
          </button> */}
          <Uploadbutton />
          <Textarea
            ref={textareaRef}
            className="min-w-0 flex-1 resize-none overflow-y-auto bg-[#2F2F2F] p-2 text-white placeholder-white outline-none focus:ring-0"
            placeholder="Ask me anything..."
            rows={1}
            style={{ height }}
            value={value}
            onInput={handleInput}
          />
          <button
            type="submit"
            className="flex rounded-sm border-none bg-transparent text-white transition duration-300 ease-in-out"
          >
            <CornerRightUp className="h-6 w-6" />
          </button>
        </form>
      </div>
    </div>
  );
};

