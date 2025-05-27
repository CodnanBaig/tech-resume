/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['avatars.githubusercontent.com'], // Add GitHub avatar domain for OAuth
  },
};

module.exports = nextConfig;
