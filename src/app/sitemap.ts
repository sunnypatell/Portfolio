import type { MetadataRoute } from "next";
import { projects } from "@/content/site";

const base = "https://www.sunnypatel.net";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: {
    path: string;
    priority: number;
    freq: MetadataRoute.Sitemap[number]["changeFrequency"];
  }[] = [
    { path: "", priority: 1, freq: "monthly" },
    { path: "/projects", priority: 0.9, freq: "monthly" },
    { path: "/work", priority: 0.8, freq: "monthly" },
    { path: "/research", priority: 0.8, freq: "yearly" },
    { path: "/about", priority: 0.7, freq: "yearly" },
    { path: "/resume", priority: 0.7, freq: "yearly" },
    { path: "/contact", priority: 0.6, freq: "yearly" },
  ];

  const projectRoutes = projects.map((p) => ({
    path: `/projects/${p.slug}`,
    priority: 0.7,
    freq: "yearly" as const,
  }));

  return [...staticRoutes, ...projectRoutes].map((r) => ({
    url: `${base}${r.path}`,
    lastModified: now,
    changeFrequency: r.freq,
    priority: r.priority,
  }));
}
