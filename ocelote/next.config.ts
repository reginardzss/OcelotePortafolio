/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ocelote-archive.s3.us-east-2.amazonaws.com", // 🔹 Agrega tu dominio de S3
      },
    ],
  },
};

module.exports = nextConfig;
