const BookingModal = ({ event, onClose, onBook, shouldDisable, error, showBookingButton }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96 relative z-50">
        <h2 className="text-xl font-bold mb-4">{event.title}</h2>
        <p className="text-gray-700"><strong>Type:</strong> {event.type}</p>
        <p className="text-gray-700"><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
        <p className="text-gray-700"><strong>Available Spots:</strong> {event.capacity}</p>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        {showBookingButton && (
          <button
          onClick={onBook}
          disabled={shouldDisable}
          className={`mt-4 px-4 py-2 rounded w-full transition ${
            shouldDisable ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-700"
          }`}
        >
          {shouldDisable ? "Already Booked" : "Book Event"}
        </button>
        )}
    

        <button
          className="mt-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 transition w-full"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default BookingModal;
