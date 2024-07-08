import SummaryChat from "@/app/_components/chat-comp";
import { InputComp } from "@/app/_components/input-comp";
import Navbar from "@/app/_components/navbar-comp/Navbar";
import { Doc } from "@/app/_components/navbar-comp/NavSidebar";
import { Typebar } from "@/app/_components/typebar";

export default function ChatClient({ currentDoc }: { currentDoc: Doc }) {
    return (
        <>
            <Navbar />
            <Typebar />
            <SummaryChat currentDoc={currentDoc} />
            <InputComp />
        </>
    )
}