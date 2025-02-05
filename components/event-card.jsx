import { Calendar, MapPin } from "lucide-react";

const EventCard = ({ event, onTitleClick }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 border border-gray-300 hover:shadow-lg transition cursor-pointer">
      <h3 className="text-lg font-bold text-gray-800 hover:underline" onClick={onTitleClick}>{event.title}</h3>
      <p className="text-sm text-gray-500 font-semibold">{event.type}</p> 

      <div className="flex items-center text-gray-600 text-sm mt-2">
        <Calendar size={16} className="mr-2 text-blue-500" /> 
        <span>{new Date(event.date).toLocaleDateString()}</span>
      </div>

      <div className="flex items-center text-gray-600 text-sm mt-1">
        <MapPin size={16} className="mr-2 text-red-500" /> 
        <span>{event.locationName || "Unknown"}</span>
      </div>
    </div>
  );
};

export default EventCard;
