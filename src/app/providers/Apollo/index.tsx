"use client";
// ^ this file needs the "use client" pragma

import { ApolloLink, HttpLink } from "@apollo/client";
import { ApolloNextAppProvider, ApolloClient, InMemoryCache, SSRMultipartLink } from "@apollo/experimental-nextjs-app-support";
import { setContext } from "@apollo/client/link/context";

const port = process.env.PORT || 3000;

function makeClient() {
  const httpLink = new HttpLink({
    uri: process.env.NODE_ENV === "production" ? `https://${process.env.VERCEL_URL}/api/graphql` : "http://localhost:3000/api/graphql",
  });

  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("token");
    return {
      headers: {
        ...headers,
        authorization: token ? `${token}` : "",
      },
    };
  });
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
  });
}

// you need to create a component to wrap your app in
export default function ApolloWrapper({ children }: React.PropsWithChildren) {
  return <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>;
}
