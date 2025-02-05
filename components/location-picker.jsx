import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";

let L; // Prevent SSR issues

const LocationPicker = ({ isOpen, onClose, onSelect }) => {
  const mapRef = useRef(null);
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    if (!isOpen || typeof window === "undefined") return;

    import("leaflet").then((leaflet) => {
      L = leaflet;

      if (mapRef.current !== null) {
        mapRef.current.remove();
        mapRef.current = null;
      }

      mapRef.current = L.map("location-map").setView([51.505, -0.09], 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(mapRef.current);

      mapRef.current.on("click", (e) => {
        const { lat, lng } = e.latlng;

        // Remove previous marker
        if (marker) marker.remove();

        // Add new marker
        const newMarker = L.marker([lat, lng]).addTo(mapRef.current);
        setMarker(newMarker);

        onSelect({ latitude: lat, longitude: lng });
        onClose(); 
      });
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove(); // Cleanup map when modal closes
        mapRef.current = null;
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white p-4 rounded shadow-lg w-full max-w-2xl h-auto relative">
        <h2 className="text-lg font-bold mb-2">Click on the map to select a location</h2>
        <div id="location-map" className="w-full h-72 border border-gray-300 rounded"></div>
        <button
          className="absolute top-2 right-2 bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-700 transition"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default LocationPicker;
