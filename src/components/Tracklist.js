// src/components/Tracklist.js
import React from 'react';
import Track from './Track';

function Tracklist({ tracks, onAdd, onRemove }) {
  return (
    <div className="tracklist">
      {tracks.map(track => (
        <Track key={track.id} track={track} onAdd={onAdd} onRemove={onRemove} />
      ))}
    </div>
  );
}

export default Tracklist;
