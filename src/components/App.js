import React, { useState } from 'react';
import './App.css';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import Playlist from './Playlist';
import PlayListList from './PlayListList';
import Spotify from '../Spotify';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState('New Playlist');
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playlistId, setPlaylistId] = useState(null);

  const addTrackToPlaylist = (track) => {
    if (playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    setPlaylistTracks(prevTracks => [...prevTracks, track]);
  };

  const removeTrackFromPlaylist = (track) => {
    setPlaylistTracks(prevTracks => prevTracks.filter(savedTrack => savedTrack.id !== track.id));
  };

  const updatePlaylistName = (name) => {
    setPlaylistName(name);
  };

  const savePlaylist = async () => {
    const trackUris = playlistTracks.map(track => track.uri);
    await Spotify.savePlaylist(playlistName, trackUris, playlistId);
    setPlaylistName('New Playlist');
    setPlaylistTracks([]);
    setPlaylistId(null);
  };

  const searchSpotify = (term) => {
    Spotify.search(term).then(searchResults => {
      setSearchResults(searchResults);
    });
  };

  const selectPlaylist = async (id) => {
    const tracks = await Spotify.getPlaylist(id);
    const playlist = await Spotify.getUserPlaylists().then(playlists => playlists.find(pl => pl.id === id));
    
    setPlaylistId(id);
    setPlaylistName(playlist.name);
    setPlaylistTracks(tracks);
  };

  return (
    <div>
      <h1>Jammming</h1>
      <SearchBar onSearch={searchSpotify} />
      <PlayListList onSelect={selectPlaylist} />
      <div className="app-container">
        <SearchResults searchResults={searchResults} onAdd={addTrackToPlaylist} />
        <Playlist
          playlistName={playlistName}
          playlistTracks={playlistTracks}
          onRemove={removeTrackFromPlaylist}
          onNameChange={updatePlaylistName}
          onSave={savePlaylist}
        />
      </div>
    </div>
  );
}

export default App;
