module.exports = async (phase, { defaultConfig }) => {
  /**
   * @type {import('next').NextConfig}
   */

  const path = require('path')

  const nextConfig = {
    distDir: 'build',
    reactStrictMode: true,
    trailingSlash: true,
    webpackDevMiddleware: config => {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300
      }
      return config
    },
    sassOptions: {
      includePaths: [path.join(__dirname, 'styles')]
    },
    env: {
      GOOGLE_ID: process.env.GOOGLE_ID,
      GOOGLE_SECRET: process.env.GOOGLE_SECRET,
      SECRET: process.env.SECRET,
      DEV_GATEWAY_API: process.env.DEV_GATEWAY_API,
      DEV_EVENT_API: process.env.DEV_EVENT_API,
    }
  }
  return nextConfig
}
