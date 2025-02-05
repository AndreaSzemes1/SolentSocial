"use client";

import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import EventCard from "./event-card";

const Leaflet = dynamic(() => import("leaflet"), { ssr: false });

const EventDetails = ({ event, onClose }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null); 
  const [L, setL] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!event || !event.location || !mapRef.current) return;

    import("leaflet").then((leaflet) => {
      setL(leaflet);

      if (mapInstance.current) {
        mapInstance.current.setView(
          [event.location.latitude, event.location.longitude],
          13
        );
        return;
      }

      mapInstance.current = leaflet.map(mapRef.current, {
        center: [event.location.latitude, event.location.longitude],
        zoom: 13,
      });

      leaflet
        .tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "© OpenStreetMap contributors",
        })
        .addTo(mapInstance.current);

      leaflet
        .marker([event.location.latitude, event.location.longitude])
        .addTo(mapInstance.current);
    });

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [event]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96 relative">
        <EventCard event={event} />
        <div ref={mapRef} className="h-48 w-full mt-4 rounded-md border border-gray-300"></div>

        <button
          className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 transition w-full"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default EventDetails;
