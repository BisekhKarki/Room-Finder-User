"use client";

import { useState, useRef, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Button } from "../../ui/button";
import { RxArrowLeft, RxArrowRight } from "react-icons/rx";
import toast from "react-hot-toast";

interface Props {
  counter: number;
  setCounter: (index: number) => void;
}

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",

  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface MapEventsProps {
  onDoubleClick: (latlng: L.LatLng) => void;
}

const MapEvents = ({ onDoubleClick }: MapEventsProps) => {
  useMapEvents({
    dblclick: (e) => {
      onDoubleClick(e.latlng);
    },
  });
  return null;
};

const DEFAULT_COORDINATES: [number, number] = [27.7172, 85.324]; // Kathmandu

const EditLocationPinMap = ({ counter, setCounter }: Props) => {
  const [pinLocation, setPinLocation] = useState<[number, number] | null>(null);
  const [locationName, setLocationName] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>("");
  const [mapType, setMapType] = useState<"default" | "satellite">("default");
  const mapRef = useRef<L.Map | null>(null);

  const handleDoubleClick = async (latlng: L.LatLng) => {
    const lat = latlng.lat;
    const lng = latlng.lng;
    setPinLocation([lat, lng]);

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();
      setLocationName(data.display_name || "Unknown Location");
    } catch (error) {
      console.error("Error fetching location name:", error);
      setLocationName("Unknown Location");
    }
  };

  const handleSearchLocation = async () => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchInput
        )}&limit=1`
      );
      const data = await response.json();
      if (data && data[0]) {
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);
        setPinLocation([lat, lon]);
        setLocationName(data[0].display_name);

        const map = mapRef.current;
        if (map) {
          map.setView([lat, lon], 13);
        }
      } else {
        alert("Location not found");
      }
    } catch (error) {
      console.error("Error fetching search location:", error);
      alert("Failed to find location");
    }
  };

  useEffect(() => {
    const pinned_Location = localStorage.getItem("Edit_Pinned_Location");
    if (pinned_Location) {
      const parsedLocation = JSON.parse(pinned_Location);
      setLocationName(parsedLocation.pinned_Location);
      setPinLocation([parsedLocation.longitude, parsedLocation.latitude]);
    }
  }, []);

  return (
    <>
      <div className="h-[80vh] w-full relative">
        <div className="absolute top-2 left-14 z-[1000] flex gap-2">
          <input
            type="text"
            placeholder="Search city in Kathmandu..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="bg-white border px-4 py-2 rounded shadow-md"
          />
          <Button
            type="button"
            className="bg-blue-500 hover:bg-blue-600 text-white"
            onClick={handleSearchLocation}
          >
            Search
          </Button>
          <Button
            type="button"
            className="bg-gray-500 hover:bg-gray-600 text-white"
            onClick={() =>
              setMapType(mapType === "default" ? "satellite" : "default")
            }
          >
            {mapType === "default" ? "Satellite View" : "Default View"}
          </Button>
        </div>

        <MapContainer
          center={DEFAULT_COORDINATES}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
          doubleClickZoom={false}
          whenReady={() => {}}
        >
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

          <MapEvents onDoubleClick={handleDoubleClick} />
          {pinLocation && (
            <Marker position={pinLocation}>
              <Popup>
                <strong>{locationName}</strong>
                <br />
                Latitude: {pinLocation[0]}
                <br />
                Longitude: {pinLocation[1]}
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
      {pinLocation && (
        <div className="p-4 bg-white shadow-md">
          <p>
            <strong>Location Name:</strong> {locationName}
          </p>
          <p>
            <strong>Latitude:</strong> {pinLocation[0]}
          </p>
          <p>
            <strong>Longitude:</strong> {pinLocation[1]}
          </p>
        </div>
      )}
      <div className="flex flex-col md:flex-row justify-center gap-4 mt-8">
        <Button
          type="button"
          className="w-full md:w-32 bg-blue-400 hover:bg-blue-500 order-2 md:order-1"
          onClick={() => setCounter(counter - 1)}
        >
          <RxArrowLeft className="mr-2" /> Previous
        </Button>
        <Button
          type="button"
          className="w-full md:w-32 bg-blue-400 hover:bg-blue-500 order-1 md:order-2"
          onClick={() => {
            if (locationName && pinLocation) {
              localStorage.setItem(
                "Edit_Pinned_Location",
                JSON.stringify({
                  pinned_Location: locationName,
                  longitude: pinLocation[0],
                  latitude: pinLocation[1],
                })
              );
            } else {
              return toast.error("Pin the location");
            }
            setCounter(counter + 1);
          }}
        >
          Next <RxArrowRight className="ml-2" />
        </Button>
      </div>
    </>
  );
};

export default EditLocationPinMap;
