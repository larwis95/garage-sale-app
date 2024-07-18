"use client"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { latLng, LatLngExpression, LatLngLiteral, LatLngTuple } from "leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

interface IMapProps {
    position?: LatLngExpression | LatLngTuple ,
    zoom?: number
}

const positionArray =[
    { lat: 42.3383, lng: -83.0481 },
    { lat: 42.3303, lng: -83.0495 },
    { lat: 42.3307, lng: -83.0479 },
    { lat: 42.3289, lng: -83.0388 },
    { lat: 42.3339, lng: -83.0528 },
]


const defaults = {
    position: {lat:42.3314,lng:-83.0458},
    zoom: 16,
}

const Map = (Map: IMapProps) => {
    const { position=defaults.position, zoom=defaults.zoom } = Map;

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
            
            <Marker position = {positionArray[3]}>
                <Popup>
                    Hopefully, you see this! <br /> Awesome!
                </Popup>
            </Marker>

            <Marker position={positionArray[2]}>
                <Popup>
                    If this one shows we are in business.
                </Popup>
            </Marker>

        </MapContainer>
    );

};

export default Map;