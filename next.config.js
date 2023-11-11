/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  env: {
    WWWALk_CLIENT_BASE_URL: process.env.WWWALk_CLIENT_BASE_URL,
    WWWALk_SERVER_BASE_URL: process.env.WWWALk_SERVER_BASE_URL,

    KAKAO_REST_API_KEY: process.env.KAKAO_REST_API_KEY,
    KAKAO_JAVASCRIPT_KEY: process.env.KAKAO_JAVASCRIPT_KEY,
  },

  async rewrites() {
    return [
      //cors
      {
        source: "/:path*",
        destination: `${process.env.WWWALk_SERVER_BASE_URL}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
