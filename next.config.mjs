/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "illustrations.popsy.co",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
