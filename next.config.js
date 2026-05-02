/** @type {import('next').NextConfig} */

const runtimeCaching = require("next-pwa/cache")
const withPWA = require('next-pwa')({
    register: true,
    skipWaiting: true,
    runtimeCaching,
    buildExcludes: [/middleware-manifest.json$/],
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
})


const nextConfig = withPWA({ 
  images: {
    unoptimized: true,
    domains: ["storage.googleapis.com", "static-clubreg.tucm.cc"]
  },
  experimental: {
    serverComponentsExternalPackages: ['puppeteer-core', '@sparticuz/chromium']
  }
})

module.exports = nextConfig;
