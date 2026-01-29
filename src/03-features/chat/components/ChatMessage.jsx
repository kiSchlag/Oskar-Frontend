import clsx from "clsx";
import { ChatMediaCard } from "./ChatMediaCard";

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
          "max-w-[80%] rounded-2xl px-4 py-2 text-sm leading-relaxed",
          isUser
            ? "bg-accent text-white rounded-br-sm"
            : "bg-card text-text border border-border rounded-bl-sm"
        )}
      >
        {message.content}

        {!isUser && mediaRecommendation && (
          <ChatMediaCard
            recommendation={mediaRecommendation}
            isFavorited={isFavorited}
            onToggleFavorite={handleToggleFavorite}
          />
        )}
      </div>
    </div>
  );
}
