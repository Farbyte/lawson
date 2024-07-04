import { Textarea } from "@/components/ui/textarea";
import { CornerRightUp, Plus } from "lucide-react";

export const InputComp = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="fixed bottom-3 w-full max-w-2xl">
        <form className="relative m-auto flex items-center gap-5 overflow-y-auto rounded-[26px] bg-[#2F2F2F] px-3 text-base md:px-5 lg:px-1 xl:px-5">
          <button>
            <Plus />
          </button>
          <Textarea
            className="h-[40px] min-w-0 flex-1 resize-none overflow-y-auto bg-[#2F2F2F] p-2 text-white placeholder-white"
            placeholder="Ask me anything..."
            rows={1}
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
