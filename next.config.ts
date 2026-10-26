import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep legacy directory out of the build
  pageExtensions: ["ts", "tsx", "js", "jsx"],
};

export default nextConfig;
