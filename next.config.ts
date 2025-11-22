import type {NextConfig} from "next";

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
      }
    ]
  },
  reactStrictMode: true,
};

export default nextConfig;
