import React from "react";

const SearchBar = ({ search, handleSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search Pokémon"
      value={search}
      onChange={handleSearch}
      className="block mx-auto p-2 border border-gray-300 rounded mb-5 w-1/2"
    />
  );
};

export default SearchBar;
