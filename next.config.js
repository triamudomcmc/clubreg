const withPWA = require("next-pwa")
const runtimeCaching = require("next-pwa/cache")

module.exports = withPWA({
  pwa: {
    register: true,
    skipWaiting: true,
    runtimeCaching,
    buildExcludes: [/middleware-manifest.json$/],
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
  },
  images: {
    unoptimized: true,
    domains: ["storage.googleapis.com", "static-clubreg.tucm.cc"]
  },
  experimental: {
    serverComponentsExternalPackages: ['puppeteer-core', '@sparticuz/chromium']
  }
})
