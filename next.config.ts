import type { NextConfig } from "next";
import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  // Ensure test files are not included in the build
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  webpack: (config) => {
    config.module.rules.push({
      test: /\.test\.(tsx|ts|jsx|js)$/,
      use: 'ignore-loader',
    });
    return config;
  },
};

export default withBundleAnalyzer(nextConfig);
