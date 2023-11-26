// next.config.js
const nextConfig = {
  images: {
    domains: [
      'cdni.iconscout.com',
      'encrypted-tbn0.gstatic.com',
      'upload.wikimedia.org',
      'encrypted-tbn0.gstatic.com',
      'd1nhio0ox7pgb.cloudfront.net',
      'img.icons8.com',
      'data:image/png;base64',
      'dodopizza-a.akamaihd.net',
      'react-pizza-v2-psi.vercel.app',
      'c8.alamy.com',
      'react-pizza-v2.vercel.app',
      'cdn-icons-png.flaticon.com',
      'www.shakeyspizza.ph',
      'as2.ftcdn.net',
    ],
  },
  webpack(config, { isServer }) {
    if (isServer) {
      // config.node = {
      //   fs: 'empty',
      //   global: true,
      //   crypto: 'empty',
      //   process: true,
      //   Buffer: true,
      //   zlib: 'empty',
      // };
    }
    return config;
  },
};

module.exports = nextConfig;
