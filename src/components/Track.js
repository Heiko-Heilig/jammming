// src/components/Track.js
import React from 'react';

function Track({ track, onAdd, onRemove }) {
  const handleAdd = () => {
    if (onAdd) {
      onAdd(track);
    }
  };

  const handleRemove = () => {
    if (onRemove) {
      onRemove(track);
    }
  };

  return (
    <div className="track">
      <div className="track-info">
        <p>{track.name}</p>
        <p>{track.artist}</p>
        <p>{track.album}</p>
      </div>
      {onAdd && <button onClick={handleAdd}>+</button>}
      {onRemove && <button onClick={handleRemove}>-</button>}
    </div>
  );
}

export default Track;
