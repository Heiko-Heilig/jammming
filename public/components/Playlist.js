// Playlist.js
import React from 'react';
import Tracklist from './Tracklist.js';

function Playlist() {
  return (
    <div className="playlist">
      <h2>Playlist</h2>
      <Tracklist />
      <button>Save To Spotify</button>
    </div>
  );
}

export default Playlist;
