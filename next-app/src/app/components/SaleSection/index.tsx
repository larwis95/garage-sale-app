"use client";
import { useRef, useState } from "react";
import SaleCard from "../Cards/Sales";
import { useQuery } from "@apollo/client";
import { GET_NEARBY_SALES } from "@/app/libs/auth/api/graphql/queries";
import { AnimatePresence } from "framer-motion";
import { Sale } from "@/app/components/lottie";

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
    <div className="flex flex-col items-center justify-center h-screen">
       <Sale />
      <div className="w-full">
        <input
          className="w-full"
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
        <p className="text-center text-xl font-bold text-yellow-300">Search Radius: {sliderValue} miles</p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-4 p-4">
        {!data || (!data.nearBySales.length && !loading) ? (
          <p className="text-xl font-bold text-yellow-300">No sales found, try increasing the search area!</p>
        ) : (
          data.nearBySales.map((sale: ISale) => (
            <AnimatePresence mode="wait" key={sale._id}>
              <SaleCard title={sale.title} category={sale.category} startDate={sale.startDate} endDate={sale.endDate} location={sale.location} description={sale.description} discount={sale.discount} recurring={sale.recurring} _id={sale._id} />
            </AnimatePresence>
          ))
        )}
      </div>
    </div>
  );
}
