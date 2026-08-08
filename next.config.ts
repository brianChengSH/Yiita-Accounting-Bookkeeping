import type { NextConfig } from "next";

const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const basePath = configuredBasePath === "/" ? "" : configuredBasePath.replace(/\/$/, "");

const nextConfig: NextConfig = {
  output: "export",
  assetPrefix: basePath || undefined,
  images: { unoptimized: true },
};

export default nextConfig;
