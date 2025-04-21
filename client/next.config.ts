// next.config.js
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.tile.openstreetmap.org",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "server.arcgisonline.com",
      },
      {
        protocol: "https",
        hostname: "*.google.com",
      },
      {
        protocol: "https",
        hostname: "api.mapbox.com",
      },
      {
        protocol: "https",
        hostname: "gibs.earthdata.nasa.gov",
      },
      // Add any other domains you need for map tiles
    ],
    domains: [
      "res.cloudinary.com",
      "tile.openstreetmap.org",
      "server.arcgisonline.com",
      "mt1.google.com",
      "api.mapbox.com",
      "gibs.earthdata.nasa.gov",
    ],
  },
  // Optional: If you need to disable image optimization for map tiles
  // (recommended for map tiles as they don't need optimization)
  experimental: {
    optimizePackageImports: ["react-leaflet"],
  },
};

export default nextConfig;
