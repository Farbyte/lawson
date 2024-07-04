import { Textarea } from "@/components/ui/textarea";
import { CornerRightUp } from "lucide-react";

export const InputComp = () => {
  return (
    <div className="flex items-center justify-center">
      <form
        className="relative w-full flex justify-center"
      >
        <Textarea
          className="bg-[#2F2F2F] text-white w-full resize-none rounded-md"
          placeholder="Ask me anything..."
        />
        <button
          type="submit"
          className="text-white flex rounded-sm border-none bg-transparent transition duration-300 ease-in-out"
        >
          <CornerRightUp className="h-6 w-6" />
        </button>
      </form>
    </div>
  );
};
