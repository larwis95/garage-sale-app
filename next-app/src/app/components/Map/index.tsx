import dynamic from "next/dynamic";
import {useMemo, useState, useEffect} from "react";
//import useUserLocation from "@/app/hooks/useUserLocation";
import { GET_NEARBY_SALES } from "@/app/libs/auth/api/graphql/queries";
import { getClient } from "@/ApolloClient";
import { LatLngExpression, LatLngTuple } from "leaflet";
import FetchUserLocation from "./Location"

interface IMapValues{
  sales?: any;
}
// interface Location {
//   latitude: number;
//   longitude: number;
// }
  // title: string;
  // category: string;
  // startDate: Date;
  // endDate: Date;
  // location: string;
  // geoLocation: { type: string; index?: string; coordinates: [number, number] };
  // description: string;
  // discount: number;
  // recurring: boolean;
  // items:




export default function MapView(props: IMapValues ) {
  const salesArray = props.sales;
  // const [userLocation, setUserLocation] = useState<Location | null>(null);


  // useEffect(()=>{
  //   const getUserLocation = async ()=>{
  //     try {
  //       const location = await FetchUserLocation();
  //       setUserLocation(location);
  //     } catch (error) {
  //       console.error('Failed to set user location:', error);
  //     }
  //   };

  //   getUserLocation();
  // });

  //const client = getClient();
  const Map = useMemo(()=>dynamic(
    ()=> import('@/app/components/Map/Map'),
    {
      loading: ()=> <p>Please wait. Map is loading.</p>,
      ssr: false
    }),[]
  );

  // if (!userLocation) {
  //   return <p>Loading location...</p>;
  // }
  //const userLocation = await useUserLocation().then((data)=>{ return data; });


  return (
      <div id="map" className="bg-white-700 mx-auto my-5 w-[50%] h-[480px]">
        <Map  sales={salesArray} />
      </div>
  );
}

//position={[userLocation.latitude,userLocation.longitude]}
