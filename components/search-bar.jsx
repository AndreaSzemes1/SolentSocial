"use client";

import { Search, XCircle } from "lucide-react";
import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleReset = () => {
    setSearchTerm("");
    onSearch("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg border border-gray-200 flex items-center p-3 space-x-2">
      <input
        type="text"
        placeholder="Search events by type..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full p-2 bg-transparent border-none text-gray-700 focus:outline-none placeholder-gray-400"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
      >
        <Search size={18} />
      </button>
      {searchTerm && (
        <button
          onClick={handleReset}
          className="text-gray-500 hover:text-red-500 transition"
        >
          <XCircle size={20} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
