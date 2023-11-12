/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  env: {
    WWWALk_CLIENT_BASE_URL: process.env.WWWALk_CLIENT_BASE_URL,
    WWWALk_SERVER_BASE_URL: process.env.WWWALk_SERVER_BASE_URL,

    KAKAO_REST_API_KEY: process.env.KAKAO_REST_API_KEY,
    KAKAO_JAVASCRIPT_KEY: process.env.KAKAO_JAVASCRIPT_KEY,

    FIREBASE_apiKey: process.env.FIREBASE_apiKey,
    FIREBASE_authDomain: process.env.FIREBASE_authDomain,
    FIREBASE_projectId: process.env.FIREBASE_projectId,
    FIREBASE_storageBucket: process.env.FIREBASE_storageBucket,
    FIREBASE_messagingSenderId: process.env.FIREBASE_messagingSenderId,
    FIREBASE_appId: process.env.FIREBASE_appId,
    FIREBASE_measurementId: process.env.FIREBASE_measurementId,
  },

  async rewrites() {
    return [
      //cors
      {
        source: "/:path*",
        destination: `${process.env.WWWALk_SERVER_BASE_URL}/:path*`,
      },

      {
        source: "/homePage",
        destination: "/homePage/homePage",
      },

      {
        source: "/walkPage",
        destination: "/walkPage/walkPage",
      },

      {
        source: "/editPage",
        destination: "/editPage/editPage",
      },
    ];
  },
};

module.exports = nextConfig;
