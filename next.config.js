const cssMinimizer = require("css-minimizer-webpack-plugin");
const ThreeMinifierPlugin = require("@yushijinhun/three-minifier-webpack");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, ctx) => {
    if (!ctx.dev) {
      config.optimization.minimizer.push(
        new cssMinimizer({
          minify: cssMinimizer.parcelCssMinify,
        })
      );

      config.cache = false;
      const threeMinifier = new ThreeMinifierPlugin();
      config.plugins.unshift(threeMinifier);
      config.resolve.plugins.unshift(threeMinifier.resolver);
    }

    return config;
  },
};

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
const withPlugins = require("next-compose-plugins");
const { createVanillaExtractPlugin } = require("@vanilla-extract/next-plugin");
module.exports = withPlugins(
  [createVanillaExtractPlugin(), withBundleAnalyzer],
  nextConfig
);
