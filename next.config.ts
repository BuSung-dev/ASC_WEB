import type { NextConfig } from "next";

const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  output: "export",
  trailingSlash: true,
  ...(configuredBasePath
    ? {
        basePath: configuredBasePath,
        assetPrefix: configuredBasePath,
      }
    : {}),
};


export default nextConfig;
