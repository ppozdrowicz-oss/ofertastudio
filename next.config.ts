import type { NextConfig } from "next";

import { routes } from "./src/config/routes.ts";

const nextConfig: NextConfig = {
  experimental: {
    useTypeScriptCli: false,
    webpackBuildWorker: false,
  },
  poweredByHeader: false,
  reactStrictMode: true,
  rewrites() {
    return {
      beforeFiles: [
        { source: routes.home, destination: "/ofertastudio/index.html" },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
