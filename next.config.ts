import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.0.0.2'],
  images: {
    dangerouslyAllowLocalIP: process.env.NODE_ENV === "development",
    remotePatterns: [
      {protocol: 'https', hostname: 'placehold.jp'},
      {protocol: 'https', hostname: 'images.microcms-assets.io'}
    ]
  }
};

export default nextConfig;
