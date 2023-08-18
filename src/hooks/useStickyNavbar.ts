import { useCallback, useEffect, useState } from "react";

export const useStickyNavbar = () => {
  const [sticky, toggleSticky] = useState(false);

  const stickyScrollListener = useCallback(() => {
    toggleSticky(window.scrollY > 0);
  }, []);

  useEffect(() => {
    document.addEventListener("scroll", stickyScrollListener);

    return () => {
      document.removeEventListener("scroll", stickyScrollListener);
    };
  }, [stickyScrollListener]);

  return {
    sticky,
  };
};
