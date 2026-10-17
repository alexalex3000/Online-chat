import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  experimental: {
    agentFeedback: true,
    turbopackUseBuiltinSass: true,
  },
  reactCompiler: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "src")],
  },
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;