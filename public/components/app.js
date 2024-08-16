// App.js
import React from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults.js';
import Playlist from './Playlist';

function App() {
  return (
    <div>
      <h1>Jammming</h1>
      <SearchBar />
      <div className="app-container">
        <SearchResults />
        <Playlist />
      </div>
    </div>
  );
}

export default App;
