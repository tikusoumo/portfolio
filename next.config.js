/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // Disabled to support Server Actions for CMS
  images: { 
    unoptimized: false, // Enable Next.js image optimization
    formats: ['image/avif', 'image/webp'],
  },
  compress: true, // Enable gzip compression
  productionBrowserSourceMaps: false, // Disable source maps in production
};

module.exports = nextConfig;
