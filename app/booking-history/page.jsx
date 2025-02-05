"use client";

import ConfirmationDialog from "@/components/confirmation-dialog";
import EventDetails from "@/components/event-details";
import EventList from "@/components/event-list";
import { app } from "@/firebase/firebase.config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const BookingHistory = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, eventId: null });
  const router = useRouter();

  const auth = getAuth(app);
  const db = getFirestore(app);

  useEffect(() => {
    if (typeof window === "undefined") return; 
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setLoading(false);
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [auth, router]);

  useEffect(() => {
    if (!user) {
      return;
    };

    const fetchBookings = async () => {
      try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists() && userSnap.data().bookings) {
          const eventIds = userSnap.data().bookings;
          const eventPromises = eventIds.map(async (eventId) => {
            const eventRef = doc(db, "events", eventId);
            const eventSnap = await getDoc(eventRef);
            return eventSnap.exists() ? { id: eventSnap.id, ...eventSnap.data() } : null;
          });

          const allEvents = (await Promise.all(eventPromises)).filter(Boolean);
          const now = Date.now();
          setUpcomingEvents(allEvents.filter((event) => event.date > now));
          setPastEvents(allEvents.filter((event) => event.date <= now));
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user, db]);

  const handleCancelBooking = async () => {
    if (!user || !confirmDialog.eventId) return;

    try {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      const eventRef = doc(db, "events", confirmDialog.eventId);
      const eventSnap = await getDoc(eventRef);

      if (userSnap.exists() && eventSnap.exists()) {
        const updatedBookings = userSnap.data().bookings.filter((id) => id !== confirmDialog.eventId);
 
        const eventData = eventSnap.data();
        await updateDoc(userRef, { bookings: updatedBookings });
        await updateDoc(eventRef, { capacity: eventData.capacity + 1 });

        setUpcomingEvents((prev) => prev.filter((event) => event.id !== confirmDialog.eventId));
        setPastEvents((prev) => prev.filter((event) => event.id !== confirmDialog.eventId));
      }

      setConfirmDialog({ isOpen: false, eventId: null });
    } catch (error) {
      console.error("Error canceling booking:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Booking History</h1>

      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : (
        <>
          <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
          <EventList
            events={upcomingEvents}
            onDetails={(event) => setSelectedEvent(event)}
            onCancel={(eventId) => setConfirmDialog({ isOpen: true, eventId })}
            buttonTypes={{ details: true, cancel: true }}
          />

          <h2 className="text-xl font-semibold mt-8 mb-4">Past Events</h2>
          <EventList
            events={pastEvents}
            onDetails={(event) => setSelectedEvent(event)}
            buttonTypes={{ details: true, cancel: false }}
          />
        </>
      )}

      {selectedEvent && <EventDetails event={selectedEvent} onClose={() => setSelectedEvent(null)} />}
   
      <ConfirmationDialog
        isOpen={confirmDialog.isOpen}
        message="Are you sure you want to cancel this booking?"
        onConfirm={handleCancelBooking}
        onCancel={() => setConfirmDialog({ isOpen: false, eventId: null })}
      />
    </div>
  );
};

export default BookingHistory;
