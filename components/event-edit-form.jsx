import { useState } from "react";
import LocationPicker from "./location-picker";

const EventEditForm = ({ event, onSubmit, onClose }) => {
  const isEditing = !!event;
  const [title, setTitle] = useState(event?.title || "");
  const [type, setType] = useState(event?.type || "");
  const [date, setDate] = useState(event ? new Date(event?.date).toISOString().split("T")[0] : "");
  const [capacity, setCapacity] = useState(event?.capacity || 0);
  const [locationName, setLocationName] = useState(event?.locationName || "");
  const [location, setLocation] = useState(
    event?.location ? { latitude: event.location.latitude, longitude: event.location.longitude } : null);
  const [showLocationPicker, setShowLocationPicker] = useState(false);

  const isFormValid = title && type && date && capacity && locationName && location;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const eventData = {
      title,
      type,
      date,
      capacity,
      locationName,
      location
    };
    
    await onSubmit(eventData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="bg-white p-6 rounded shadow-lg w-96">
      <h2 className="text-xl font-bold mb-4">{isEditing ? "Edit Event" : "Add Event"}</h2>
      <form onSubmit={handleSubmit}>
        <label className="block text-gray-700">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />

        <label className="block text-gray-700 mt-3">
          Type <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />

        <label className="block text-gray-700 mt-3">
          Date <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />

        <label className="block text-gray-700 mt-3">
          Capacity <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        <label className="block text-gray-700 mt-3">
          Location name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={locationName}
          onChange={(e) => setLocationName(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />

        <label className="block text-gray-700 mt-3">
          Location <span className="text-red-500">*</span>
        </label>
        <button
          type="button"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full"
          onClick={() => setShowLocationPicker(true)}
        >
          Select Location on Map
        </button>

        {location && (
          <div className="mt-2 text-gray-600">
            <span className="text-sm">Selected Location: {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}</span> 
          </div>
        )}

        <div className="flex justify-between mt-4">
          <button
            type="submit"
            disabled={!isFormValid}
            className={`px-4 py-2 rounded text-white transition ${
              isFormValid
                ? "bg-green-500 hover:bg-green-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {isEditing ? "Save Changes" : "Add Event"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
          >
            Cancel
          </button>
        </div>
      </form>
      {showLocationPicker && (
          <LocationPicker
            isOpen={showLocationPicker}
            onClose={() => setShowLocationPicker(false)}
            onSelect={(coords) => setLocation(coords)}
          />
        )}
    </div>
  </div>
  );
};

export default EventEditForm;
