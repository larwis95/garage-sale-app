"use client";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import useUserLocation from "@/app/hooks/useUserLocation";
import { GET_NEARBY_SALES, GET_USER_LOCATION } from "@/app/libs/auth/api/graphql/queries";
import { useQuery } from "@apollo/client";

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
interface IMapValues {
  sales: ISale[];
  zoom?: number;
  position?: { lat: number; lng: number };
}


export default function MapView(props: IMapValues) {
  const { sales, zoom, position } = props;
  const { data, loading } = useQuery(GET_USER_LOCATION);
  const userLocation = data?.userLocation || {};
  //const { lat, lng } = position;

  console.log(position);

  const Map = useMemo(
    () =>
      dynamic(() => import("@/app/components/Map/Map"), {
        loading: () => <p>Please wait. Map is loading.</p>,
        ssr: false,
      }),
    [],
  );

  // if (!userLocation) {
  //   return <p>Loading location...</p>;
  // }
  //const userLocation = await useUserLocation().then((data)=>{ return data; });

  return (
    <div id="map" className="bg-white-700 mx-auto my-5 h-[480px] w-full">
      <Map sales={sales} zoom={zoom} position={position} />
    </div>
  );
}

//position={[userLocation.latitude,userLocation.longitude]}
