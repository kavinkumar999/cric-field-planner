import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: process.env.NODE_ENV === "production" ? "/cric-field-planner" : "",
  assetPrefix:
    process.env.NODE_ENV === "production" ? "/cric-field-planner" : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
