/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ["fr"],
    defaultLocale: "fr",
  },
  env: {
    DEV_PROTOCOL: process.env.DEV_PROTOCOL,
  }
}

module.exports = nextConfig