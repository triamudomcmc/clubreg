const withPWA = require("next-pwa")

module.exports = withPWA({
  pwa: {
    customWorkerDir: 'worker',
    register: true,
    skipWaiting: true,
  },images: {
    domains: ["storage.googleapis.com"]
  }
})
