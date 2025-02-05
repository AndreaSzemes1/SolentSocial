"use client";

import { useState } from "react";
import EventEditForm from "./event-edit-form";

const EventList = ({ events, onDelete, onEditSubmit, onDetails, onCancel, buttonTypes }) => {
  const [editingEvent, setEditingEvent] = useState(null);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 shadow-lg bg-white">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="px-6 py-3 text-left">Title</th>
            <th className="px-6 py-3 text-left">Type</th>
            <th className="px-6 py-3 text-left">Date</th>
            <th className="px-6 py-3 text-left">Location</th>
            <th className="px-6 py-3 text-left">Capacity</th>
            <th className="px-6 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id} className="border-b hover:bg-gray-100">
              <td className="px-6 py-4">{event.title}</td>
              <td className="px-6 py-4">{event.type}</td>
              <td className="px-6 py-4">{new Date(event.date).toLocaleDateString()}</td>
              <td className="px-6 py-4">{event.locationName}</td>
              <td className="px-6 py-4">{event.capacity}</td>
              <td className="px-6 py-4 flex gap-2">

                {buttonTypes?.edit && (
                  <button
                    onClick={() => setEditingEvent(event)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                  >
                    Edit
                  </button>
                )}

                {buttonTypes?.delete && (
                  <button
                    onClick={() => onDelete(event.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                )}

                {buttonTypes?.details && (
                  <button
                    onClick={() => onDetails(event)}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                  >
                    Details
                  </button>
                )}

                {buttonTypes?.cancel && (
                  <button
                    onClick={() => onCancel(event.id)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-700 transition"
                  >
                    Cancel
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingEvent && (
        <EventEditForm
          event={editingEvent}
          onSubmit={(updatedEventData) => onEditSubmit(updatedEventData, editingEvent.id)}
          onClose={() => setEditingEvent(null)}
        />
      )}
    </div>
  );
};

export default EventList;
