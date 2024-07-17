import { getClient } from "@/ApolloClient";
import { GET_SALES } from "@/app/libs/auth/api/graphql/queries";
import SalesCard from "@/app/components/Cards/Sales";

interface ISale {
  _id: string;
  title: string;
  description: string;
  category: string;
  startDate: string;
  endDate: string;
  location: string;
  discount: number;
  recurring: boolean;
}

export default async function Sales() {
  const client = getClient();
  const { data } = await client.query({
    query: GET_SALES,
  });

  return (
    <div className="flex flex-row gap-4 flex-wrap justify-center">
      {data.sales.map((sale: ISale) => (
        <SalesCard key={sale._id} {...sale} />
      ))}
    </div>
  );
}
