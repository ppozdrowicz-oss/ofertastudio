import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    useTypeScriptCli: false,
    webpackBuildWorker: false,
  },
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
