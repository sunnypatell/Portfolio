"use client";

import { MotionConfig } from "motion/react";
import { SmoothScroll } from "./smooth-scroll";
import { CustomCursor } from "@/components/motion/custom-cursor";
import { ScrollResetOnRoute } from "@/components/motion/scroll-reset";
import { CommandPalette } from "@/components/ui/command-palette";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll>
        <ScrollResetOnRoute />
        <CustomCursor />
        {children}
        <CommandPalette />
      </SmoothScroll>
    </MotionConfig>
  );
}
