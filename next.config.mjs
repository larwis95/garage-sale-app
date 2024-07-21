/** @type {import('next').NextConfig} */

const nextConfig = {
  async rewrites() {
    if (process.env.NODE_ENV === "production") {
      return [
        {
          source: `/api/graphql`,
          destination: `https://${process.env.NEXT_PUBLIC_API_URL}/api/graphql`,
        },
      ];
    }
    return [
      {
        source: `/api/graphql`,
        destination: "http://localhost:3001",
      },
    ];
  },
};

export default nextConfig;
