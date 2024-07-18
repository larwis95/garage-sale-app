import dynamic from "next/dynamic";
import {useMemo, useState} from "react";
import useUserLocation from "@/app/hooks/useUserLocation";
import { GET_NEARBY_SALES } from "@/app/libs/auth/api/graphql/queries";
import { getClient } from "@/ApolloClient";


export default async function MapView() {
  const client = getClient();
  const Map = useMemo(()=>dynamic(
    ()=> import('@/app/components/Map/Map'),
    {
      loading: ()=> <p>Please wait. Map is loading.</p>,
      ssr: false
    }),[] );


    const userLocation = await useUserLocation().then((data)=>{ return data; });


  return (
      <div id="map" className="bg-white-700 mx-auto my-5 w-[98%] h-[480px]">
        <Map position={[userLocation.latitude,userLocation.longitude]} />
      </div>
  );
}
