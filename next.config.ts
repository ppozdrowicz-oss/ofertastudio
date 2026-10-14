import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  devIndicators: false,
  turbopack: { root: process.cwd() },
  // Use the supported compiler API; the new detached CLI path is unreliable in restricted build containers.
  experimental: { useTypeScriptCli: false },
  images: { formats: ["image/avif", "image/webp"], qualities: [80, 90] },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};
export default nextConfig;
