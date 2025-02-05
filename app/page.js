import { Calendar, ListChecks } from "lucide-react";
import Link from "next/link";

const HomePage = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-4">Welcome to Solent Social App</h1>
      <p className="text-gray-600 text-center max-w-2xl mx-auto mb-8">
        Discover and join social events, meet like-minded people, and explore exciting experiences. 
        Whether you're into coding, music, or outdoor adventures, there's something for everyone!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/events">
          <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:shadow-lg transition cursor-pointer flex flex-col items-center">
            <Calendar size={40} className="text-blue-500 mb-4" />
            <h2 className="text-xl font-bold text-gray-800">Check Out Events</h2>
            <p className="text-gray-600 text-center mt-2">Find and book exciting social events!</p>
          </div>
        </Link>
        
        <Link href="/booking-history">
          <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:shadow-lg transition cursor-pointer flex flex-col items-center">
            <ListChecks size={40} className="text-green-500 mb-4" />
            <h2 className="text-xl font-bold text-gray-800">View Your Booking History</h2>
            <p className="text-gray-600 text-center mt-2">Manage your past and upcoming bookings.</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
