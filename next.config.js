const withPWA = require("next-pwa")

module.exports = withPWA({
  pwa: {
    sw: 'service-worker.js',
    customWorkerDir: 'worker',
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
  },images: {
    domains: ["storage.googleapis.com"]
  }
})
