/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
  experimental: {
    appDir: true,
    serverActions: true,
  },
  eslint: {
    dirs: ['app'],
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
