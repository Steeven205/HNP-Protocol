import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@hnp/protocol", "@hnp/corporate-agent", "@hnp/hotel-agent"],
  serverExternalPackages: ["@anthropic-ai/sdk", "@modelcontextprotocol/sdk"],
};

export default nextConfig;
