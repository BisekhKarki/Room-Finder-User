"use client";
import React from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet/";
import { useEffect, useState } from "react";

// Fix for marker icons - must be defined outside the component
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

function ChangeView({
  center,
  zoom,
}: {
  center: [number, number];
  zoom: number;
}) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

interface Props {
  location: string | undefined;
}

const PropertyLocation = ({ location }: Props) => {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mapType, setMapType] = useState<"satellite" | "street">("satellite");

  useEffect(() => {
    if (location) {
      geocodeLocation(location); // Changed from hardcoded "Vanasthali, Kathmandu" to use the prop
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
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Default to Kathmandu if no position
  const defaultPosition: [number, number] = [27.7172, 85.324];

  return (
    <div className="pl-10 h-[600px] w-[90%] relative mt-10">
      {" "}
      {/* Increased height from 400px to 600px */}
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
              attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
              maxZoom={19}
            />
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
              attribution="Tiles &copy; Esri &mdash; Source: Esri"
              maxZoom={19}
            />
          </>
        ) : (
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
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
