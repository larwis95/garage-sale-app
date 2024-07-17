"use client";
import { useRef, useState } from "react";
import SaleCard from "../Cards/Sales";
import { useQuery } from "@apollo/client";
import { GET_NEARBY_SALES } from "@/app/libs/auth/api/graphql/queries";

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
  const sliderRef = useRef<HTMLInputElement>(null);
  const [radius, setRadius] = useState(10);
  const [sliderValue, setSliderValue] = useState(10);
  const { data } = useQuery(GET_NEARBY_SALES, {
    variables: { coordinates, radius: radius },
  });

  return (
    <>
      <div className="flex flex-col justify-center">
        <input
          type="range"
          min={1}
          max={100}
          value={sliderValue}
          ref={sliderRef}
          onChange={(e) => {
            setSliderValue(parseInt(e.target.value));
          }}
          onMouseLeave={() => {
            setRadius(sliderValue);
          }}
        />
        <p>Search Radius: {sliderValue} miles.</p>
      </div>
      <div className="flex flex-row flex-wrap justify-center gap-4">{!data || !data.nearBySales.length ? <p>No sales found</p> : data.nearBySales.map((sale: ISale) => <SaleCard key={sale._id} title={sale.title} category={sale.category} startDate={sale.startDate} endDate={sale.endDate} location={sale.location} description={sale.description} discount={sale.discount} recurring={sale.recurring} _id={sale._id} />)}</div>
    </>
  );
}
