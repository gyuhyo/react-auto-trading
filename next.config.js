/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  assetPrefix:
    process.env.NODE_ENV === "production"
      ? "https://gyuhyo.github.io/react-auto-trading"
      : "",
};

module.exports = nextConfig;
