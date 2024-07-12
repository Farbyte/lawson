import { InputComp } from "../_components/input-comp";
import { RootInput } from "../_components/input-comp/rootInput";
import Navbar from "../_components/navbar-comp/Navbar";
import { Typebar } from "../_components/typebar";

export default function Chat() {
  return (
    <>
      <Navbar />
      <Typebar />
      <RootInput />
    </>
  );
}
