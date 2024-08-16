// src/components/SearchResults.js
import React from 'react';
import Tracklist from './Tracklist';

function SearchResults({ searchResults, onAdd }) {
  return (
    <div className="search-results">
      <h2>Results</h2>
      <Tracklist tracks={searchResults} onAdd={onAdd} />
    </div>
  );
}

export default SearchResults;
