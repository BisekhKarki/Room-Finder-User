"use client";
import React from "react";
import { Map } from "@vis.gl/react-maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

const PropertyLocation = () => {
  return (
    <div className="mt-10">
      <Map
        initialViewState={{
          longitude: 86,
          latitude: 28,
          zoom: 5,
        }}
        style={{ width: "100%", height: 600 }}
        mapStyle="https://tiles.openfreemap.org/styles/liberty"
      />
      ;
    </div>
  );
};

export default PropertyLocation;
