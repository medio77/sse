import type { NextConfig } from "next";

// GitHub Pages is served from a sub-path (e.g. /repo), so the base path is
// configurable at build time. Leave BASE_PATH empty for local/`out` previews.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath: basePath || undefined,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
