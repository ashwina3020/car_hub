// next.config.js

const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if there are ESLint errors
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Warning: This allows production builds to successfully complete even if there are TypeScript errors
    ignoreBuildErrors: true,
  }
};

module.exports = nextConfig;
