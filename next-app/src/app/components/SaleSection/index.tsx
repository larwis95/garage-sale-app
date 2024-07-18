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
      <div className="min-h-50svh align-center flex flex-col items-center justify-center">
        <input
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
        <p>Search Radius: {sliderValue} miles.</p>
      </div>
      {loading && (
        <div className="min-h-50svh flex w-full justify-center">
          <p>Loading...</p>
        </div>
      )}
      {!loading && (
        <div className="min-h-50svh flex w-full flex-row flex-wrap justify-center gap-4">
          {!data || (!data.nearBySales.length && !loading) ? (
            <p>No sales found, try increasing the radius!</p>
          ) : (
            data.nearBySales.map((sale: ISale) => (
              <>
                <AnimatePresence mode="wait">
                  <SaleCard key={sale._id} title={sale.title} category={sale.category} startDate={sale.startDate} endDate={sale.endDate} location={sale.location} description={sale.description} discount={sale.discount} recurring={sale.recurring} _id={sale._id} />
                </AnimatePresence>
              </>
            ))
          )}
        </div>
      )}
    </>
  );
}
