import { Typebar } from "@/app/_components/typebar";
import { InputComp } from "../../_components/input-comp";
import Navbar from "../../_components/navbar-comp/Navbar";

export default function Chat() {
  return (
    <>
      <Navbar />
      <Typebar />
      <InputComp />
    </>
  );
}
