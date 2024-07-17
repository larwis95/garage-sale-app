import { headers } from "next/headers";
import { getClient } from "@/ApolloClient";
import { GET_USER_LOCATION } from "@/app/libs/auth/api/graphql/queries";

interface IUserLocation {
  latitude: number;
  longitude: number;
}

export default async function useUserLocation(): Promise<IUserLocation> {
  const header = headers();
  const ip = header.get("x-forwarded-for") || header.get("x-real-ip");
  const client = getClient();
  const { data } = await client.query({
    query: GET_USER_LOCATION,
    variables: { ip: ip === "::1" ? "8.8.8.8" : ip },
  });
  const { latitude, longitude } = data.userLocation;

  return { latitude, longitude };
}
