import { getClient } from "@/ApolloClient";
import { GET_SALE } from "@/app/libs/auth/api/graphql/queries";

export default async function Sale({ params }: { params: { id: string } }) {
  const client = getClient();
  const { data, loading } = await client.query({
    query: GET_SALE,
    variables: { id: params.id },
  });

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>{data.sale.title}</h1>
      <p>{data.sale.description}</p>
    </div>
  );
}
