import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { NextRequest } from "next/server";
import { NextApiRequest } from "next";
import { resolvers, typeDefs } from "./schemas";
import { withAuth } from "@/app/libs/auth/backend";
import dbConnect from "@/app/libs/db/dbConnect";

dbConnect();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: process.env.NODE_ENV === "production" ? false : true,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => ({ req, user: await withAuth(req as NextRequest) }),
});

export { handler as GET, handler as POST };
