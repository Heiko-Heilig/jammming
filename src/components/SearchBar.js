// src/components/SearchBar.js
import React from 'react';

function SearchBar() {
  return (
    <div className="search-bar">
      <input type="text" placeholder="Enter A Song, Album, or Artist" />
      <button>Search</button>
    </div>
  );
}

export default SearchBar;
