/** @type {import('next').NextConfig} */

const nextConfig = {
  async rewrites() {
    if (process.env.NODE_ENV === "production")
      return [
        {
          source: `/api/graphql`,
          destination: `${process.env.VERCEL_URL}/api/graphql`,
        },
      ];
    return [
      {
        source: `/api/graphql`,
        destination: "http://localhost:3001",
      },
    ];
  },
};

export default nextConfig;
