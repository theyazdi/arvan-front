/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn-a-hid.partocrs.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
