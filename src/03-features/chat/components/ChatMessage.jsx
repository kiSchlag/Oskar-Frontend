import clsx from "clsx";

export function ChatMessage({ message }) {
  const isUser = message.role === "user";

  return (
    <div
      className={clsx("flex", isUser ? "justify-end" : "justify-start")}
    >
      <div
        className={clsx(
          "max-w-[80%] rounded-2xl px-4 py-2 text-sm leading-relaxed",
          isUser
            ? "bg-accent text-white rounded-br-sm"
            : "bg-card text-text border border-border rounded-bl-sm"
        )}
      >
        {message.content}
      </div>
    </div>
  );
}
