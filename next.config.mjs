/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: '*.googleusercontent.com',
            port: "",
         pathname: "**",
          },
          {
            protocol:'https',
            hostname: 'egap-orders.s3.amazonaws.com',
          }
        ],
      },
      // webpack: (config) => {
      //   config.externals.push("bcrypt");
      //   return config;
      // }
      eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
