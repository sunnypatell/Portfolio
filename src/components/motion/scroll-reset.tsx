"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useLenis } from "lenis/react";

// new route should start at the top; reset lenis immediately so it doesn't
// fight the page-enter animation.
export function ScrollResetOnRoute() {
  const pathname = usePathname();
  const lenis = useLenis();
  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
  }, [pathname, lenis]);
  return null;
}
