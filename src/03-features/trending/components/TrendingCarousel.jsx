import { useRef, useState } from "react";
import { useTrending } from "../use-trending";
import { MediaCard, MediaCardSkeleton } from "@/03-features/movies";

export function TrendingCarousel({ isFavorite, onToggleFavorite }) {
  const [timeWindow, setTimeWindow] = useState("week");
  const { data, loading } = useTrending(timeWindow);
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (el) el.scrollBy({ left: dir * 300, behavior: "smooth" });
  };

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-text">Trending</h2>
          <div className="flex gap-2">
            {["day", "week"].map((tw) => (
              <button
                key={tw}
                onClick={() => setTimeWindow(tw)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  timeWindow === tw
                    ? "bg-accent text-white"
                    : "bg-card text-text-muted hover:text-text"
                }`}
              >
                {tw === "day" ? "Today" : "This Week"}
              </button>
            ))}
          </div>
        </div>

        <div className="relative group/carousel">
          <button
            onClick={() => scroll(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-dark/80 hover:bg-card text-text w-10 h-10 rounded-full hidden md:flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity"
            aria-label="Scroll left"
          >
            ‹
          </button>
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x"
          >
            {loading
              ? Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="w-44 shrink-0 snap-start">
                    <MediaCardSkeleton />
                  </div>
                ))
              : data?.results?.map((item) => {
                  const mediaType = item.media_type || "movie";
                  return (
                    <div
                      key={`${mediaType}-${item.id}`}
                      className="w-44 shrink-0 snap-start"
                    >
                      <MediaCard
                        item={item}
                        mediaType={mediaType}
                        isFavorited={isFavorite?.(mediaType, item.id)}
                        onToggleFavorite={onToggleFavorite}
                      />
                    </div>
                  );
                })}
          </div>
          <button
            onClick={() => scroll(1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-dark/80 hover:bg-card text-text w-10 h-10 rounded-full hidden md:flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity"
            aria-label="Scroll right"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
