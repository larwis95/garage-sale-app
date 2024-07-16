"use client";
import SalesHeader from "./header";
import SalesBody from "./body";
import SalesFooter from "./footer";

interface ISalesCardProps {
  title: string;
  category: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
  discount: number;
  recurring: boolean;
  _id: string;
}

export default function SalesCard({
  title,
  category,
  startDate,
  endDate,
  location,
  description,
  discount,
  recurring,
  _id,
}: ISalesCardProps) {
  return (
    <div className="flex flex-col lg:w-1/4 p-4 bg-slate-500 rounded-lg shadow-md sm:w-full md:w-full">
      <SalesHeader title={title} startDate={startDate} endDate={endDate} />
      <SalesBody description={description} />
      <SalesFooter discount={discount} location={location} _id={_id} />
    </div>
  );
}
