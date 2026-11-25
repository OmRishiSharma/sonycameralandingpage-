import path from "node:path";
import { fileURLToPath } from "node:url";
const root = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: root,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  webpack(config) {
    config.resolve.alias["@"] = root;
    return config;
  },
  async headers() {
    return [{ source: "/frames/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] }];
  },
};
export default nextConfig;
