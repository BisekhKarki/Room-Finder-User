"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

// Dynamically import react-leaflet components
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  {
    ssr: false,
  }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  {
    ssr: false,
  }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  {
    ssr: false,
  }
);

// Dynamically define ChangeView to handle useMap
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
}

const PropertyLocation = ({ location }: Props) => {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mapType, setMapType] = useState<"satellite" | "street">("satellite");

  // Dynamically load Leaflet and configure icons on client side
  useEffect(() => {
    import("leaflet").then((L) => {
      // Fix for marker icons
      const DefaultIcon = L.icon({
        iconUrl: "/images/marker-icon.png",
        iconRetinaUrl: "/images/marker-icon-2x.png",
        shadowUrl: "/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });

      // Set default icon globally
      L.Marker.prototype.options.icon = DefaultIcon;
    });
  }, []);

  useEffect(() => {
    console.log("Location prop:", location); // Debug log
    if (location) {
      geocodeLocation(location);
    }
  }, [location]);

  const geocodeLocation = async (address: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          address + ", Nepal"
        )}&format=json&addressdetails=1&limit=1`
      );

      const data = await response.json();

      if (data && data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);
        setPosition([lat, lon]);
      } else {
        setError("Location not found. Please try a different address.");
        setPosition(null);
      }
    } catch (err) {
      setError("Failed to fetch location data. Please try again.");
      setPosition(null);
      console.error("Geocoding error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Default to Kathmandu if no position
  const defaultPosition: [number, number] = [27.7172, 85.324];

  return (
    <div className="pl-10 h-[600px] w-[90%] relative mt-10">
      {loading && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <p className="text-white">Searching for location...</p>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 bg-red-100 bg-opacity-90 flex items-center justify-center z-10 p-4">
          <p className="text-red-700">{error}</p>
        </div>
      )}
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
        zoom={position ? 16 : 13}
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
