"use client";
import { useRef, useState } from "react";
import SaleCard from "../Cards/Sales";
import { useQuery } from "@apollo/client";
import { GET_NEARBY_SALES } from "@/app/libs/auth/api/graphql/queries";
import { AnimatePresence } from "framer-motion";

interface ISaleSectionProps {
  coordinates: { latitude: number; longitude: number };
}

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

export default function SaleSection({ coordinates }: ISaleSectionProps) {
  const [radius, setRadius] = useState(10);
  const [sliderValue, setSliderValue] = useState(10);
  const { data, loading } = useQuery(GET_NEARBY_SALES, {
    variables: { coordinates, radius: radius },
  });

  return (
    <>
      <div className="relative min-h-52 min-w-full">
        <input
          className="top-30 absolute left-1/2 top-[95%] -translate-x-1/2 transform"
          type="range"
          min={1}
          max={100}
          value={sliderValue}
          onChange={(e) => {
            setSliderValue(parseInt(e.target.value));
          }}
          onMouseUp={() => {
            setRadius(sliderValue);
          }}
          onTouchEnd={() => {
            setRadius(sliderValue);
          }}
        />
        <p className="absolute left-1/2 top-[85%] -translate-x-1/2 transform text-nowrap">Search Radius: {sliderValue} miles.</p>
      </div>
      <div className="min-h-50svh flex w-svw flex-row flex-wrap items-center justify-center gap-4 p-4 sm:flex-col md:flex-row lg:w-svw lg:flex-row">
        {!data || (!data.nearBySales.length && !loading) ? (
          <p>No sales found, try increasing the radius!</p>
        ) : (
          data.nearBySales.map((sale: ISale) => (
            <AnimatePresence mode="wait" key={sale._id}>
              <SaleCard title={sale.title} category={sale.category} startDate={sale.startDate} endDate={sale.endDate} location={sale.location} description={sale.description} discount={sale.discount} recurring={sale.recurring} _id={sale._id} />
            </AnimatePresence>
          ))
        )}
      </div>
    </>
  );
}
