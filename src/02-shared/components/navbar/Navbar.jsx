import { useState, useRef, useCallback, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import { Input } from "@/01-ui";
import { useDebounce, useClickOutside } from "@/02-shared/hooks";
import { apiFetch } from "@/02-shared/utils";
import { HOME, JOURNAL } from "@/02-shared/constants";
import { SearchDropdown } from "./SearchDropdown";

export function Navbar({ isFavorite, onToggleFavorite }) {
  const location = useLocation();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const debouncedQuery = useDebounce(query, 250);

  useClickOutside(dropdownRef, () => setShowDropdown(false));

  useEffect(() => {
    if (!debouncedQuery || debouncedQuery.length < 2) {
      setResults([]);
      return;
    }
    apiFetch(`/tmdb/search?query=${encodeURIComponent(debouncedQuery)}`)
      .then((data) => {
        setResults(data.results?.slice(0, 10) || []);
        setShowDropdown(true);
      })
      .catch(() => setResults([]));
  }, [debouncedQuery]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSelect = useCallback(
    (item) => {
      const isMedia = item.media_type === "movie" || item.media_type === "tv";

      if (isMedia && onToggleFavorite) {
        onToggleFavorite(item, item.media_type);
      } else {
        setShowDropdown(false);
        setQuery("");
        setResults([]);
      }
    },
    [onToggleFavorite]
  );

  return (
    <nav
      className={clsx(
        "fixed top-0 left-0 right-0 z-40 backdrop-blur-md border-b transition-all duration-300",
        scrolled
          ? "bg-dark/90 border-border shadow-lg"
          : "bg-dark/30 border-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to={HOME} className="text-xl font-bold text-text shrink-0">
          Filmzimmer
        </Link>

        <div className="flex-1 flex justify-center px-4">
          <div className="w-full max-w-md relative" ref={dropdownRef}>
            <Input
              type="search"
              placeholder="Search movies, TV shows, people..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => results.length > 0 && setShowDropdown(true)}
              className="text-sm bg-white/10 border-white/20 placeholder:text-white/50 focus:bg-white/15 focus:border-accent/50"
            />
            {showDropdown && (
              <SearchDropdown results={results} onSelect={handleSelect} isFavorite={isFavorite} />
            )}
          </div>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          {[
            { to: HOME, label: "Home" },
            { to: JOURNAL, label: "Journal" },
          ].map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={clsx(
                "text-sm font-medium px-3 py-1.5 rounded-full transition-all",
                location.pathname === to
                  ? "bg-white/20 text-white"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              )}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
