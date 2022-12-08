/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */

const withLess = require('next-with-less');

const nextConfig = withLess({
  lessLoaderOptions: {
    lessOptions: {
      javascriptEnabled: true
    }
  }
});

module.exports = nextConfig;
