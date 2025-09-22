/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client']
  },
  // Enabling SCSS support
  sassOptions: {
    includePaths: ['./src/styles'],
  }
}

module.exports = nextConfig