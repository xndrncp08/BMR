import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Milestone 8 will add Supabase storage domain here for product images
    remotePatterns: [],
  },
};

export default nextConfig;
