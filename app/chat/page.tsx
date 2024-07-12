import { RootInput } from "../_chat_components/input-comp/rootInput";
import Navbar from "../_chat_components/navbar-comp/Navbar";
import { Typebar } from "../_chat_components/typebar";

export default function Chat() {
  return (
    <>
      <Navbar />
      <Typebar disabled={true} />
      <div className="flex h-[77vh] flex-col items-center justify-center">
        <div className="font-virgil text-lg text-[#8E8E8E] md:text-2xl lg:text-4xl">
          Click on the "+" button to start chatting...
        </div>
      </div>
      <RootInput />
    </>
  );
}
