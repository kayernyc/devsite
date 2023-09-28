/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
  experimental: {
    serverActions: true,
  },
  eslint: {
    dirs: ['app'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'placekitten.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'app/_scss')],
  },
  webpack: function (config) {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    });
    return config;
  },
  output: 'standalone',
};

module.exports = nextConfig;
