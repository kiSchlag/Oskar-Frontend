import clsx from "clsx";
import { ChatMediaCard } from "./ChatMediaCard";
import { MarkdownRenderer } from "@/02-shared/components";

export function ChatMessage({ message, isFavorite, onToggleFavorite }) {
  const isUser = message.role === "user";
  const { mediaRecommendation } = message;

  const isFavorited = mediaRecommendation
    ? isFavorite(mediaRecommendation.media_type, mediaRecommendation.media_id)
    : false;

  const handleToggleFavorite = () => {
    if (!mediaRecommendation) return;
    const item = {
      id: mediaRecommendation.media_id,
      title: mediaRecommendation.title,
      poster_path: mediaRecommendation.poster_path,
    };
    onToggleFavorite(item, mediaRecommendation.media_type);
  };

  return (
    <div className={clsx("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={clsx(
          "max-w-[90%] rounded-2xl text-sm leading-relaxed",
          isUser
            ? "bg-accent text-white rounded-br-sm px-4 py-2"
            : "bg-card text-text border border-border rounded-bl-sm overflow-hidden"
        )}
      >
        {!isUser && mediaRecommendation && (
          <div className="flex justify-center p-3">
            <ChatMediaCard
              recommendation={mediaRecommendation}
              isFavorited={isFavorited}
              onToggleFavorite={handleToggleFavorite}
            />
          </div>
        )}

        <div className={clsx(!isUser ? "px-4 py-2" : "")}>
          {isUser ? (
            <span className="whitespace-pre-wrap">{message.content}</span>
          ) : (
            <MarkdownRenderer content={message.content} />
          )}
        </div>
      </div>
    </div>
  );
}
