"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);

const ChangeView = dynamic(
  () =>
    import("react-leaflet").then((mod) => {
      const Component: React.FC<{ center: [number, number]; zoom: number }> = ({
        center,
        zoom,
      }) => {
        const map = mod.useMap();
        map.setView(center, zoom);
        return null;
      };
      return Component;
    }),
  { ssr: false }
);

interface Props {
  location: string | undefined;
  longitude: number;
  latitude: number;
}

const PropertyLocation = ({ location, longitude, latitude }: Props) => {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [mapType, setMapType] = useState<"satellite" | "street">("satellite");

  useEffect(() => {
    // Import Leaflet and set the marker icon inside useEffect
    import("leaflet").then((L) => {
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
        iconUrl:
          "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });
    });
  }, []);

  useEffect(() => {
    if (location && latitude && longitude) {
      setPosition([longitude, latitude]);
    }
  }, [location, longitude, latitude]);

  const defaultPosition: [number, number] = [27.7172, 85.324];

  return (
    <div className="pl-10 h-[600px] w-[90%] relative mt-10">
      <div className="absolute top-2 right-2 z-[1000] flex gap-2">
        <button
          onClick={() => setMapType("satellite")}
          className={`px-3 py-1 text-sm rounded ${
            mapType === "satellite"
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-800"
          }`}
        >
          Satellite
        </button>
        <button
          onClick={() => setMapType("street")}
          className={`px-3 py-1 text-sm rounded ${
            mapType === "street"
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-800"
          }`}
        >
          Street
        </button>
      </div>
      <MapContainer
        center={position || defaultPosition}
        zoom={15}
        style={{ height: "100%", width: "100%", zIndex: 0 }}
      >
        {position && <ChangeView center={position} zoom={16} />}
        {mapType === "satellite" ? (
          <>
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              attribution="Tiles © Esri — Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
              maxZoom={19}
            />
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
              attribution="Tiles © Esri — Source: Esri"
              maxZoom={19}
            />
          </>
        ) : (
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
        )}
        {position && (
          <Marker position={position}>
            <Popup>{location}</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default PropertyLocation;
