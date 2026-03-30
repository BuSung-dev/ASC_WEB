import type { NextConfig } from "next";

const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const configuredBasePath =
  process.env.NEXT_PUBLIC_BASE_PATH ??
  (process.env.GITHUB_ACTIONS === "true" && repoName ? `/${repoName}` : "");

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
