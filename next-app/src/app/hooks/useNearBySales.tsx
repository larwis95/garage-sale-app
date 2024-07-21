import { getClient } from "@/ApolloClient";
import { GET_NEARBY_SALES } from "../libs/auth/api/graphql/queries";

interface ISale {
  _id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  geoLocation: {
    coordinates: number[];
  };
}

export default async function useNearBySales(coordinates: { latitude: number; longitude: number }, radius: number): Promise<ISale[]> {
  const client = getClient();
  const { data } = await client.query({
    query: GET_NEARBY_SALES,
    variables: { coordinates, radius },
  });
  return data.nearBySales;
}
