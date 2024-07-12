import { InputComp } from "../_components/input-comp";
import { RootInput } from "../_components/input-comp/rootInput";
import Navbar from "../_components/navbar-comp/Navbar";
import { Typebar } from "../_components/typebar";

export default function Chat() {
  return (
    <>
      <Navbar />
      <Typebar />
      <div className="flex flex-col items-center justify-center h-[77vh]">
        <div className="font-virgil text-[#8E8E8E] text-lg md:text-2xl lg:text-4xl">Click on the "+" button to start chatting...</div>
      </div>
      <RootInput />
    </>
  );
}
