import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // three ships untranspiled esm that drei pulls in
  transpilePackages: ["three"],
  images: {
    // local screenshots are large pngs; let next serve avif/webp
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
