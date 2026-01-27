import { useState } from "react";
import { ChatFab } from "./ChatFab";
import { ChatPanel } from "./ChatPanel";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen ? (
        <ChatPanel onClose={() => setIsOpen(false)} />
      ) : (
        <ChatFab onClick={() => setIsOpen(true)} />
      )}
    </>
  );
}
