// src/components/Playlist.js
import React from 'react';
import Tracklist from './Tracklist';

function Playlist({ playlistName, playlistTracks, onRemove, onNameChange }) {
  const handleNameChange = (event) => {
    onNameChange(event.target.value);
  };

  return (
    <div className="playlist">
      <input
        type="text"
        value={playlistName}
        onChange={handleNameChange}
        className="playlist-name-input"
      />
      <Tracklist tracks={playlistTracks} onRemove={onRemove} />
      <button>Save To Spotify</button>
    </div>
  );
}

export default Playlist;
