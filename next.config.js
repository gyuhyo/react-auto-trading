/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config, { isServer }) => {
    config.resolve.fallback = { tls: false };
    if (!isServer) config.resolve.fallback.fs = false;
    return config;
  },
};

module.exports = nextConfig;
