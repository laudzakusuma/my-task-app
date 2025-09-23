/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: ['./src/styles'],
    prependData: `@import "globals";`, // Optional: auto-import globals
  },
  images: {
    domains: ['localhost'],
    formats: ['image/webp', 'image/avif'],
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  httpAgentOptions: {
    keepAlive: true,
  },
  // Remove experimental options that cause warnings
  webpack: (config, { isServer }) => {
    // Suppress specific warnings
    config.infrastructureLogging = {
      level: 'error',
    }
    
    // Reduce console output
    config.stats = 'errors-warnings'
    
    return config
  },
}

module.exports = nextConfig