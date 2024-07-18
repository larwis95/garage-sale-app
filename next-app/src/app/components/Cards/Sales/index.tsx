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

export default function SalesCard({ title, category, startDate, endDate, location, description, discount, recurring, _id }: ISalesCardProps) {
  return (
    <div className="relative flex flex-col justify-between rounded-lg border border-white bg-slate-800 shadow-md sm:w-full md:w-full lg:w-1/4">
      <SalesHeader title={title} startDate={startDate} endDate={endDate} />
      <SalesBody description={description} />
      <SalesFooter discount={discount} location={location} _id={_id} />
    </div>
  );
}
