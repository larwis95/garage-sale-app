"use client"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { latLng, LatLngExpression, LatLngLiteral, LatLngTuple } from "leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

import { GET_COORDINATES, GET_NEARBY_SALES } from "@/app/libs/auth/api/graphql/queries";
import { useQuery } from "@apollo/client";
import { getClient } from "@/ApolloClient";




interface IMapProps {
  position?: LatLngExpression | LatLngTuple ,
  zoom?: number
}

// const client = getClient();
//   const results =  (async ()=>{ await client.query({
//               query:GET_NEARBY_SALES,
//               variables: {coordinates:position, radius: 5 }
//             })
//           });
//   console.log(results);


const defaults = {
  position: {lat:42.3314,lng:-83.0458},
  zoom: 15.8,
}

const Map = (props: IMapProps) => {

  const position = props.position===undefined ? defaults.position : props.position;
  const zoom = defaults.zoom;

  console.log(position)

  const positionArray =[
    {name: 'Egan\s Pub', coords: { lat: 42.2083, lng: -83.4903 }}, //should be out of range
    {name: 'Sam\'s Place', coords:{ lat: 42.2055, lng: -83.4861 }},
    {name: 'A\&W', coords:{ lat: 42.2049, lng: -83.4865 }},
    {name: 'Belleville Area Secretary of State', coords:{ lat: 42.2038, lng: -83.4822 }},
    {name: 'Victory Park', coords:{ lat: 42.2048, lng: -83.4846 }},
  ]
  return (
    <MapContainer
        center = {position}
        zoom = {zoom}
        scrollWheelZoom = {true}
        style={ {height: "100%", width: "50%" }}
    >

    <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />

    {  positionArray.some(val => Object.keys(val).length != 0) && positionArray.map((val, idx)=>{
        return(
            <Marker key={idx} position = {val.coords}>
                <Popup>
                    Index {idx}:  {val.name}
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
