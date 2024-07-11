import React from "react";
import { Arrow } from "./arrow";

export const SvgComp = () => {
  return (
    <>
      <div className="fixed top-[400px] font-virgil text-xl text-[#838E94] md:left-[100px] md:text-[25px] lg:left-[620px] lg:text-[30px] flex flex-col items-center gap-5 m-7 lg:m-4">
        <div className="sm:hidden md:block">To start a new Conversation add your pdf.</div>
        <div>Click on the "+" button <span className="lg:hidden">on the navbar</span> to upload your pdf.</div>
      </div>
      <Arrow />
    </>
  );
};
