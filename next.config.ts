import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "cms.engineeringspecialisedsupport.com",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "cms.engineeringspecialisedsupport.com",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;
