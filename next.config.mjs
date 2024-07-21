/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: `/api/graphql`,
        destination: process.env.NODE_ENV === "production" ? "https://127.0.0.1:3001" : "http://localhost:3001",
      },
    ];
  },
};

export default nextConfig;
