import type { NextConfig } from "next";

const assetPrefix = process.env.NEXT_PUBLIC_SITE_URL
  ?.replace(/^http:\/\/(?=(?:www\.)?yiita\.com(?:\/|$))/i, "https://")
  .replace(/\/$/, "");

const nextConfig: NextConfig = {
  output: "export",
  assetPrefix,
  images: { unoptimized: true },
};

export default nextConfig;
