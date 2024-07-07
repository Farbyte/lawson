import { InputComp } from "../_components/input-comp";
import Navbar from "../_components/navbar-comp/Navbar";
import { Typebar } from "../_components/Typebar";

export default function Chat() {
  return (
    <>
      <Navbar />
      <Typebar />
      <InputComp />
    </>
  );
}
