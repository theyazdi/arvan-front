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
  // Allow external origins for payment gateway
  experimental: {
    serverActions: {
      allowedOrigins: ['asan.shaparak.ir', 'localhost:3000'],
    },
  },
};

module.exports = nextConfig;
