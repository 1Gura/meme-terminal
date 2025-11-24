import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
      {
        protocol: "https",
        hostname: "metadata.uxento.io",
      },
      {
        protocol: "https",
        hostname: "edge.uxento.io",
      },
      {
        protocol: "https",
        hostname: "pbs.twimg.com",
      },
      {
        protocol: "https",
        hostname: "ipfs.io",
      },
      {
        protocol: "https",
        hostname: "cdn.launch.meme",
      },
      {
        protocol: "https",
        hostname: "**.launch.meme",
      },
    ],
  },
  reactStrictMode: true,
};

export default nextConfig;
