import { Textarea } from "@/components/ui/textarea";
import { CornerRightUp } from "lucide-react";

export const InputComp = () => {
  return (
    <div className="flex h-[20vh] items-center justify-center sm:h-[15vh]">
      <form
        className="relative w-full px-4 pt-2 sm:pt-10"
      >
        <Textarea
          className="bg-[#2F2F2F] text-white w-full resize-none rounded-md p-3 pr-10"
          placeholder="Ask me anything..."
        />
        <button
          type="submit"
          className="text-white absolute right-6 top-[40px] flex rounded-sm border-none bg-transparent px-2 py-1 transition duration-300 ease-in-out sm:top-[71px]"
        >
          <CornerRightUp className="h-6 w-6" />
        </button>
      </form>
    </div>
  );
};
