/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
  dest: 'public'
})

const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'assets.coingecko.com',
            port: '',
            pathname: '/coins/**',
          },
        ],
      },
}

module.exports = withPWA({nextConfig})
