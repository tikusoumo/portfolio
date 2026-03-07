/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // Disabled to support Server Actions for CMS
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
