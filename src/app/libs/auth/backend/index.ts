import jwt, { JwtPayload } from "jsonwebtoken";
import { GraphQLError } from "graphql";
import { NextRequest } from "next/server";

interface iSignToken {
  username: string;
  email: string;
  _id: string;
}

const secret: string =
  process.env.NODE_ENV === "production" ? process.env.JWT_SECRET! : "secret";
const expiration: string =
  process.env.NODE_ENV === "production" ? process.env.JWT_EXPIRATION! : "2h";

export const signToken = ({ username, email, _id }: iSignToken): string => {
  const payload = { username, email, _id };
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};

export const decodeToken = (token: string): JwtPayload | null => {
  if (!token) {
    return null;
  }

  try {
    const { data }: JwtPayload = jwt.verify(token, secret, {
      maxAge: expiration,
    }) as JwtPayload;
    return data;
  } catch {
    return null;
  }
};

export const withAuth = async (
  req: NextRequest
): Promise<JwtPayload | null> => {
  const token = req.headers.get("authorization") || "";
  return decodeToken(token);
};

export const AuthenticationError = new GraphQLError(
  "Could not authenticate user."
);
