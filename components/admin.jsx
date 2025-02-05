"use client";

import { app } from "@/firebase/firebase.config";
import { addDoc, collection, deleteDoc, doc, GeoPoint, getDocs, getFirestore, serverTimestamp, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import ConfirmationDialog from "./confirmation-dialog";
import EventEditForm from "./event-edit-form";
import EventList from "./event-list";

const Admin = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, eventId: null });
  const db = getFirestore(app);
 
  useEffect(() => {
    const fetchEvents = async () => {
      const querySnapshot = await getDocs(collection(db, "events"));
      const eventsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEvents(eventsData);
      setLoading(false);
    };

    fetchEvents();
  }, []);

  const handleDeleteEvent = async () => {
    await deleteDoc(doc(db, "events", confirmDialog.eventId));
    setEvents(events.filter((event) => event.id !== confirmDialog.eventId));
    setConfirmDialog({ isOpen: false, eventId: null });
  };

  const handleAddEvent = async (newEventData) => {
    const eventRef = await addDoc(collection(db, "events"), {
      ...newEventData,
      date: new Date(newEventData?.date).getTime(),
      location: new GeoPoint(newEventData.location.latitude, newEventData.location.longitude),
      createdAt: serverTimestamp()
    });

    setEvents([...events, { id: eventRef.id, ...newEventData }]);
    setShowAddForm(false);
  };

  const handleEditEvent = async (updatedEventData, eventId) => {
    const eventRef = doc(db, "events", eventId);
    await updateDoc(eventRef, {
      ...updatedEventData,
      date: new Date(updatedEventData.date).getTime(),
      location: new GeoPoint(updatedEventData.location.latitude, updatedEventData.location.longitude), 
    });
  
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === eventId ? { ...event, ...updatedEventData } : event
      )
    );
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          + Add Event
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-600">Loading events...</p>
      ) : (
        <EventList
          events={events}
          onDelete={(eventId) => setConfirmDialog({ isOpen: true, eventId })}
          onEditSubmit={(updatedEventData, eventId) => handleEditEvent(updatedEventData, eventId)}
          buttonTypes={{ edit: true, delete: true }}
        />
      )}

      {showAddForm && (
        <EventEditForm 
          event={null} 
          onSubmit={handleAddEvent} 
          onClose={() => setShowAddForm(false)} 
        />
      )}

      <ConfirmationDialog
        isOpen={confirmDialog.isOpen}
        message="Are you sure you want to delete this event?"
        onConfirm={handleDeleteEvent}
        onCancel={() => setConfirmDialog({ isOpen: false, eventId: null })}
      />
    </div>
  );
};

export default Admin;
