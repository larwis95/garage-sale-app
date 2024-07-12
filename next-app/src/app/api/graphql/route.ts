import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { NextRequest } from "next/server";
import { NextApiRequest } from "next";
import { resolvers, typeDefs } from "./schemas";
import { authMiddleware } from "@/app/libs/auth";
import dbConnect from "@/app/libs/db/dbConnect";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: process.env.NODE_ENV === "production" ? false : true,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => ({ req, user: authMiddleware({ req }) }),
});

dbConnect();

export { handler as GET, handler as POST };
