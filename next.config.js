/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed 'output: export' to enable API routes
  // API routes require server-side rendering and cannot work with static exports
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

module.exports = nextConfig;
