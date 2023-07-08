/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: "default",
    domains: ["lh3.googleusercontent.com"],
  },
  skipTrailingSlashRedirect: true,
};

module.exports = nextConfig;
