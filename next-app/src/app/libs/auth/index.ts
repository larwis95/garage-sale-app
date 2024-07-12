import jwt, { JwtPayload } from "jsonwebtoken";
import { GraphQLError } from "graphql";

interface iSignToken {
  username: string;
  email: string;
}

const secret: string =
  process.env.NODE_ENV === "production" ? process.env.JWT_SECRET! : "secret";
const expiration: string =
  process.env.NODE_ENV === "production" ? process.env.JWT_EXPIRATION! : "2h";

export const signToken = ({ username, email }: iSignToken): string => {
  const payload = { username, email };
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};

export const authMiddleware = ({ req }: { req: any }) => {
  let token = req.headers.authorization;

  if (req.headers.authorization) {
    token = token.split(" ").pop().trim();
  }

  if (!token) {
    return req;
  }

  try {
    const { data }: JwtPayload = jwt.verify(token, secret, {
      maxAge: expiration,
    }) as JwtPayload;
    req.user = data;
  } catch {
    console.log("Invalid token");
  }
  console.log(req);
  return req;
};

export const AuthenticationError = new GraphQLError(
  "Could not authenticate user."
);
