# Solent Social App

Solent Social App is a web application that allows students and residents to search for meetups and social events. Users can browse, book, and manage their events, while admins can create and manage events.

## Features

- User authentication with Firebase (signup, login, logout)
- Search for events by type
- Book events with limited capacity
- View booking history (upcoming and past events)
- Cancel event bookings
- Display events on a Leaflet map
- Admin dashboard for adding, editing, and deleting events
- Profile page to update user name

## Setup Instructions

1. Install dependencies: npm install

2. Run the development server: npm run dev

## Directory Structure

```
/solent-social-app
│── /app
│   │── /events (Events page)
│   │── /admin (Admin dashboard)
│   │── /profile (User profile page)
│   │── /booking-history (Booking history page)
│   │── /login (Login page)
│   │── /signup (Signup page)
│── /components
│   │── header.jsx
│   │── events-map.jsx
│   │── event-card.jsx
│   │── event-list.jsx
│   │── event-form.jsx
│   │── booking-modal.jsx
│   │── confirmation-dialog.jsx
│   │── profile.jsx
│   │── location-picker.jsx
│   │── search-bar.jsx
│   │── event-details.jsx
│── /firebase
│   │── firebase.config.js
│── public (Assets like map markers)
│── README.md
```

## Functionality Overview

### **Authentication**

- `AdminGuard`: Restricts access to the admin page.

### **Event Management**

- `EventList`: Displays a list of events with actions for editing and deleting (admin only).
- `EventCard`: Displays individual event details in a card format.
- `EventEditForm`: Used for adding and editing events.
- `EventsMap`: Displays events on a Leaflet map with markers.

### **Booking System**

- `BookingModal`: Allows users to book events.
- `handleBooking`: Adds event ID to the user's `bookings` array in Firestore.
- `handleCancelBooking`: Removes event from bookings and restores capacity.

### **User Profile**

- `ProfilePage`: Allows users to update their name.
- `updateProfile`: Updates the `displayName` in Firebase Auth and Firestore.

### **Search & Filtering**

- `SearchBar`: Allows users to filter events by type.

### **Admin Functions**

- string to create admin: "special_admin_code"

- `handleAddEvent`: Adds a new event to Firestore.
- `handleEditEvent`: Updates event details.
- `handleDeleteEvent`: Removes an event from Firestore.
