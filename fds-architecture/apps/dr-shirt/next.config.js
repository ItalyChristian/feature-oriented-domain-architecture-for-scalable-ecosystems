//@ts-check

const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Next.js options go here
  // See: https://nextjs.org/docs/app/api-reference/config/next-config-js
};

module.exports = createVanillaExtractPlugin({
  unstable_turbopack: { mode: 'on' },
})(nextConfig);
