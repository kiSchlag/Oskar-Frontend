import { useState, useRef, useCallback, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import { Input } from "@/01-ui";
import { useDebounce, useClickOutside } from "@/02-shared/hooks";
import { apiFetch } from "@/02-shared/utils";
import { HOME, JOURNAL } from "@/02-shared/constants";
import { SearchDropdown } from "./SearchDropdown";

export function Navbar() {
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

  const handleSelect = useCallback((item) => {
    setShowDropdown(false);
    setQuery("");
    setResults([]);
  }, []);

  return (
    <nav
      className={clsx(
        "fixed top-0 left-0 right-0 z-40 bg-dark/80 backdrop-blur-md border-b transition-shadow",
        scrolled ? "border-border shadow-lg" : "border-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-6">
        <Link to={HOME} className="text-xl font-bold text-text shrink-0">
          Filmzimmer
        </Link>

        <div className="flex-1 max-w-md relative" ref={dropdownRef}>
          <Input
            type="search"
            placeholder="Search movies, TV shows, people..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => results.length > 0 && setShowDropdown(true)}
            className="text-sm"
          />
          {showDropdown && (
            <SearchDropdown results={results} onSelect={handleSelect} />
          )}
        </div>

        <div className="flex items-center gap-4">
          {[
            { to: HOME, label: "Home" },
            { to: JOURNAL, label: "Journal" },
          ].map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={clsx(
                "text-sm font-medium transition-colors",
                location.pathname === to
                  ? "text-accent"
                  : "text-text-muted hover:text-text"
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
