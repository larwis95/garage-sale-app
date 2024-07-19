"use client"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { latLng, LatLngExpression, LatLngLiteral, LatLngTuple } from "leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

import { GET_COORDINATES, GET_NEARBY_SALES } from "@/app/libs/auth/api/graphql/queries";
import { useQuery } from "@apollo/client";
import { getClient } from "@/ApolloClient";

import FetchUserLocation from "./Location";
import {useState, useEffect} from 'react';


interface IMapProps {
  position?: LatLngExpression | LatLngTuple;
  zoom?: number;
  sales?: any;
}
interface Location {
  latitude: number;
  longitude: number;
}

// const client = getClient();
//   const results =  (async ()=>{ await client.query({
//               query:GET_NEARBY_SALES,
//               variables: {coordinates:position, radius: 5 }
//             })
//           });
//   console.log(results);


const defaults = {
  position: {lat:42.2048,lng:-83.4853},
  zoom: 16,
}

const defaultSales =[
  {
    title: 'Egan\'s Pub',
    geoLocation: { type:'type', index: '', coordinates:[ -83.4903,42.2083]},
    location: '396 Main St, Belleville, MI 48111',
    description: 'Egans is the go to place in the Belleville area for Irish fare',
  }
  // {name: 'Egan\s Pub', coords: { lat: 42.2083, lng: -83.4903 }}, //should be out of range
  //   {name: 'Sam\'s Place', coords:{ lat: 42.2055, lng: -83.4861 }},
  //   {name: 'A\&W', coords:{ lat: 42.2049, lng: -83.4865 }},
  //   {name: 'Belleville Area Secretary of State', coords:{ lat: 42.2038, lng: -83.4822 }},
  //   {name: 'Victory Park', coords:{ lat: 42.2048, lng: -83.4846 }},
];

const Map = (props: IMapProps) => {

  const [userLocation, setUserLocation] = useState<Location | null>(null);


  useEffect(()=>{
    const getUserLocation = async ()=>{
      try {
        const location = await FetchUserLocation();
        setUserLocation(location);
      } catch (error) {
        console.error('Failed to set user location:', error);
      }
    };

    getUserLocation();
  });


  //const position = props.position===undefined ? defaults.position : props.position;
  const salesData = props.sales===undefined ? defaultSales : props.sales;
  const zoom = defaults.zoom;

  if (!userLocation) {
    return <p>Loading location...</p>;
  }

  const position = defaults.position;//{ lat: userLocation.latitude, lng: userLocation.longitude};
  console.log(position)

  // const positionArray =[
  //   {name: 'Egan\s Pub', coords: { lat: 42.2083, lng: -83.4903 }}, //should be out of range
  //   {name: 'Sam\'s Place', coords:{ lat: 42.2055, lng: -83.4861 }},
  //   {name: 'A\&W', coords:{ lat: 42.2049, lng: -83.4865 }},
  //   {name: 'Belleville Area Secretary of State', coords:{ lat: 42.2038, lng: -83.4822 }},
  //   {name: 'Victory Park', coords:{ lat: 42.2048, lng: -83.4846 }},
  // ]
  return (
    <MapContainer
        center = {position}
        zoom = {zoom}
        scrollWheelZoom = {true}
        style={ {textAlign:"center", height: "100%", width: "100%" }}
    >

    <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />

    {  salesData && salesData.map((val, idx)=>{
        return(
            <Marker key={idx} position = {[val.geoLocation.coordinates[1],val.geoLocation.coordinates[0]]}>
                <Popup>
                    <h2>{val.title}<br/>{val.location}</h2><p>{val.description}</p>
                </Popup>
            </Marker>
            )
    })}

    </MapContainer>
  );

};

export default Map;


//TEST DATA
// {name: 'Comerica Park', coords: { lat: 42.3383, lng: -83.0481 }}, //should be out of range
// {name: 'Theodore Levin Courthouse', coords:{ lat: 42.3303, lng: -83.0495 }},
// {name: '719 Griswold St', coords:{ lat: 42.3307, lng: -83.0479 }},
// {name: 'Renaissance Center', coords:{ lat: 42.3289, lng: -83.0388 }},
// {name: '241 Bagley St', coords:{ lat: 42.3339, lng: -83.0528 }},
