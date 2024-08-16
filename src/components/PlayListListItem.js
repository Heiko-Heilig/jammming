// src/components/PlayListListItem.js
import React from 'react';
import './PlayListListItem.css'; // Import the new CSS file

function PlayListListItem({ id, name, onSelect }) {
  const handleClick = () => {
    onSelect(id);
  };

  return (
    <div className="playlist-item-pill" onClick={handleClick}>
      <h3>{name}</h3>
    </div>
  );
}

export default PlayListListItem;
