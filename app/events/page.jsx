"use client";

import BookingModal from "@/components/booking-modal";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc, getDocs, getFirestore, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import EventCard from "../../components/event-card";
import EventsMap from "../../components/events-map";
import SearchBar from "../../components/search-bar";
import { app } from "../../firebase/firebase.config";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userBookings, setUserBookings] = useState([]);
  const [user, setUser] = useState(null);
  const db = getFirestore(app);
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchUserBookings(currentUser.uid);
      } else {
        setUserBookings([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchUserBookings = async (userId) => {
    try {
      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists() && userSnap.data().bookings) {
        setUserBookings(userSnap.data().bookings);
      } else {
        setUserBookings([]);
      }
    } catch (error) {
      console.error("Error fetching user bookings:", error);
    }
  };
  
  useEffect(() => {
    const fetchEvents = async () => {
      const querySnapshot = await getDocs(collection(db, "events"));
      const now = Date.now(); 

      const eventsData = querySnapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((event) => event.date > now);

      setEvents(eventsData);
      setFilteredEvents(eventsData);
      setLoading(false);
    };

    fetchEvents();
  }, []);

  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setFilteredEvents(events);
    } else {
      const filtered = events.filter((event) =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredEvents(filtered);
    }
  };

  const handleBooking = async (event) => {
    if (!user) {
      setError("You must be logged in to book an event.");
      return;
    }

    try {
      const userRef = doc(db, "users", user.uid);
      const eventRef = doc(db, "events", event.id);
      const eventSnap = await getDoc(eventRef);

      if (!eventSnap.exists()) {
        setError("Event not found.");
        return;
      }

      const eventData = eventSnap.data();

      if (eventData.capacity <= 0) {
        setError("This event is fully booked.");
        return;
      }

      await updateDoc(userRef, {
        bookings: [...userBookings, event.id],
      });

      await updateDoc(eventRef, {
        capacity: eventData.capacity - 1,
      });

      setUserBookings((prev) => [...prev, event.id]);

      setEvents((prevEvents) =>
        prevEvents.map((e) =>
          e.id === event.id ? { ...e, capacity: e.capacity - 1 } : e
        )
      );

      setFilteredEvents((prevEvents) =>
        prevEvents.map((e) =>
          e.id === event.id ? { ...e, capacity: e.capacity - 1 } : e
        )
      );

      setSelectedEvent(null);
      alert('Successful booking');
    } catch (err) {
      console.error("Booking failed:", err);
      setError("Failed to book event. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Upcoming Events</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 flex flex-col space-y-4">
          <SearchBar onSearch={handleSearch} />

          <div className="bg-white shadow-md rounded-lg p-4 h-[500px] overflow-y-auto border border-gray-200">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onTitleClick={() => setSelectedEvent(event)} 
                />
              ))
            ) : (
              <p className="text-gray-500 text-center">No events found.</p>
            )}
          </div>
        </div>

        <div className="lg:col-span-2 bg-white shadow-md rounded-lg border border-gray-200 relative h-[585px]">
          <EventsMap events={filteredEvents} onMarkerClick={(event) => setSelectedEvent(event)} />
        </div>
      </div>

      {selectedEvent && (
        <BookingModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onBook={() => handleBooking(selectedEvent)}
          shouldDisable={userBookings.includes(selectedEvent.id)}
          showBookingButton={!!user}
          error={error}
        />
      )}
    </div>
  );
};

export default EventsPage;
