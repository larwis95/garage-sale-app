import { HttpLink } from "@apollo/client";
import { registerApolloClient, ApolloClient, InMemoryCache } from "@apollo/experimental-nextjs-app-support";
const port = process.env.PORT || 3000;
export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      // this needs to be an absolute url, as relative urls cannot be used in SSR
      uri: process.env.NODE_ENV === "production" ? `https://${process.env.VERCEL_URL}/api/graphql` : "http://localhost:3000/api/graphql",
      // you can disable result caching here if you want to
      // (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
      // fetchOptions: { cache: "no-store" },
    }),
  });
});
