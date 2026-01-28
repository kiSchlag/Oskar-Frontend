import { useState, useRef, useCallback, useEffect } from "react";
import { useFloating, offset, flip, shift, autoUpdate } from "@floating-ui/react-dom";

export function useHoverIntent({ delay = 300 } = {}) {
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef(null);

  const { refs, floatingStyles } = useFloating({
    placement: "right",
    strategy: "fixed",
    middleware: [offset(12), flip(), shift({ padding: 16 })],
    whileElementsMounted: autoUpdate,
  });

  const clearHoverTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const handleMouseEnter = useCallback(() => {
    clearHoverTimeout();
    timeoutRef.current = setTimeout(() => setIsHovered(true), delay);
  }, [delay, clearHoverTimeout]);

  const handleMouseLeave = useCallback(() => {
    clearHoverTimeout();
    setIsHovered(false);
  }, [clearHoverTimeout]);

  useEffect(() => clearHoverTimeout, [clearHoverTimeout]);

  return {
    isHovered,
    referenceRef: refs.setReference,
    floatingRef: refs.setFloating,
    floatingStyles,
    handleMouseEnter,
    handleMouseLeave,
  };
}
