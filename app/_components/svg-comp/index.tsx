import React from "react";
import { Arrow } from "./arrow";

export const SvgComp = () => {
  return (
    <>
      <div className="fixed top-[400px] m-7 flex flex-col items-center gap-5 font-virgil text-xl text-[#838E94] md:left-[100px] md:text-[25px] lg:left-[620px] lg:m-4 lg:text-[30px]">
        <div className="sm:hidden md:block">
          To start a new Conversation add your pdf.
        </div>
        <div>
          Click on the "+" button{" "}
          <span className="lg:hidden">on the navbar</span> to upload your pdf.
        </div>
      </div>
      <Arrow />
    </>
  );
};
