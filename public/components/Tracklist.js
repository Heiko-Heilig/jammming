// Tracklist.js
import React from 'react';
import Track from './Track';

function Tracklist() {
  return (
    <div className="tracklist">
      <Track />
      <Track />
      <Track />
      {/* Add more Track components or map through an array of tracks */}
    </div>
  );
}

export default Tracklist;
