import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  // no x-frame-options: the site is intentionally embeddable
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  transpilePackages: ["three"], // three ships untranspiled esm that drei pulls in
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 90], // 90 for the about portrait; next 16 gates non-default quality behind this allowlist
  },
  async headers() {
    // assets + models are content-versioned (rename or bump ?v= on change)
    const immutable = {
      key: "Cache-Control",
      value: "public, max-age=31536000, immutable",
    };
    return [
      { source: "/:path*", headers: securityHeaders },
      { source: "/assets/:path*", headers: [immutable] },
      { source: "/models/:path*", headers: [immutable] },
      {
        // pdfs keep stable share-link names, so a short ttl over immutable
        source: "/:file*.pdf",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, must-revalidate",
          },
        ],
      },
      {
        source: "/og-image.png",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400" }],
      },
    ];
  },
};

export default nextConfig;
