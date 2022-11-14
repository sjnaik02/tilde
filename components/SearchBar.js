import React from "react";

//a search bar components to search notes in profile page
function SearchBar({ search, setSearch }) {
  return (
    <input
      className="mb-4 w-full border-b-2 border-b-white bg-primary py-2 text-white focus:outline-none"
      type="text"
      placeholder="Search Notes"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}

export default SearchBar;
