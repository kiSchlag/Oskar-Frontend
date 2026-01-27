import { useRef } from "react";
import { Skeleton } from "@/01-ui";
import { usePopularPeople } from "../use-popular-people";
import { PersonCard } from "./PersonCard";

export function PopularPeopleCarousel() {
  const { data, loading } = usePopularPeople();
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (el) el.scrollBy({ left: dir * 300, behavior: "smooth" });
  };

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-text mb-4">Popular People</h2>
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
            className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide"
          >
            {loading
              ? Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center gap-2 p-3 w-32 shrink-0"
                  >
                    <Skeleton variant="circular" className="w-16 h-16" />
                    <Skeleton variant="text" className="w-20" />
                  </div>
                ))
              : data?.results?.map((person) => (
                  <PersonCard key={person.id} person={person} />
                ))}
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
