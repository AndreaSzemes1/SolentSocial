"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";

const EventsMap = ({ events, onMarkerClick }) => {
  const mapRef = useRef(null);
  const [leafletInstance, setLeafletInstance] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") return; // Avoid SSR issues

    import("leaflet").then((leaflet) => {
      setLeafletInstance(leaflet); 

      if (!mapRef.current) {
        const map = leaflet.map("map").setView([51.505, -0.09], 13);
        leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "© OpenStreetMap contributors",
        }).addTo(map);
        mapRef.current = map;
      }
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!leafletInstance || !leafletInstance.Icon || !mapRef.current) return; 

    const { Icon, Marker } = leafletInstance;

    const customIcon = new Icon({
      iconUrl: "/marker-icon.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowUrl: "/marker-shadow.png",
      shadowSize: [41, 41],
    });

    // Clear existing markers before adding new ones
    mapRef.current.eachLayer((layer) => {
      if (layer instanceof Marker) mapRef.current.removeLayer(layer);
    });

    events.forEach((event) => {
      if (event.location) {
        const marker = new Marker([event.location.latitude, event.location.longitude], { icon: customIcon })
          .addTo(mapRef.current)
        
        marker.on("click", () => {
          if (onMarkerClick) { 
            onMarkerClick(event) 
          };
        })
      }
    });
  }, [events, leafletInstance]);

  return <div id="map" className="w-full h-full absolute top-0 left-0 z-10" />;
};

export default EventsMap;
