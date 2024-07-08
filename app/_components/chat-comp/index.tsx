import { Doc } from "../navbar-comp/NavSidebar";
import { ChatComp } from "./chat-comp";

export default async function SummaryChat ({ currentDoc }: { currentDoc: Doc }) {

  return (
    <div>
      <ChatComp currentDoc={currentDoc} />
    </div>
  );
}
