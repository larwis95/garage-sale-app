"use client";
import { useQuery } from "@apollo/client";
import { GET_SALE, GET_ME } from "@/app/libs/auth/api/graphql/queries";
import ownerContext from "@/app/providers/Owner";
import SaleHeader from "@/app/components/SalesPageComponents/Header";
import SaleBody from "@/app/components/SalesPageComponents/Body";
import { format } from "date-fns";

interface ISale {
  _id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }[];
}

export default function Sale({ params }: { params: { id: string } }) {
  const { data, loading } = useQuery(GET_SALE, {
    variables: { id: params.id },
  });

  const sale = data?.sale || {};
  const user = useQuery(GET_ME).data?.me || {};
  const userSales = user?.sales || [];
  const userSale = userSales.filter((s: ISale) => s._id === params.id);
  const isOwner = userSale[0]?._id === sale._id;
  
  if (loading) return <p>Loading...</p>;

  if (!sale._id) {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center">
        <p>Sale Not Found</p>
      </div>
    );
  }

  return (
    <div className="min-w-screen flex min-h-screen w-full flex-col items-center justify-center gap-4 overflow-x-hidden pt-24">
      <ownerContext.Provider value={{ isOwner, sale: params.id }}>
        <SaleHeader title={sale.title} description={sale.description} start={format(new Date(sale.startDate).toLocaleString([], { timeZone: "UTC" }), "MM/dd/yy")} end={format(new Date(sale.endDate).toLocaleString([], { timeZone: "UTC" }), "MM/dd/yy")} />
        <SaleBody items={sale.items} />
      </ownerContext.Provider>
    </div>
  );
}
