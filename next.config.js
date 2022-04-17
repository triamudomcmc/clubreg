const withPWA = require("next-pwa")

module.exports = withPWA({
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },images: {
    domains: ["storage.googleapis.com"]
  }
})
