import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    NEXT_PUBLIC_VAPI_PUBLIC_KEY: process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY,
  },
  images: {
    remotePatterns: [],
  },
};

export default nextConfig;
