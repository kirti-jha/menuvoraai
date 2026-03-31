/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['api.dicebear.com'],
  },
};

module.exports = nextConfig;
