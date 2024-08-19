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
  const [removedTracks, setRemovedTracks] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const addTrackToPlaylist = (track) => {
    if (playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      setErrorMessage('Song is already in Playlist!');
      return;
    }
    setPlaylistTracks(prevTracks => [...prevTracks, track]);
    setErrorMessage(''); // Clear any existing error messages
  };
  

  const removeTrackFromPlaylist = (track) => {
    setPlaylistTracks(prevTracks => prevTracks.filter(savedTrack => savedTrack.id !== track.id));
    setRemovedTracks(prevTracks => [...prevTracks, track.uri]);
  };

  const updatePlaylistName = (name) => {
    setPlaylistName(name);
  };

  const savePlaylist = async () => {
    const trackUris = playlistTracks.map(track => track.uri);
    await Spotify.savePlaylist(playlistName, trackUris, playlistId, removedTracks);
    setPlaylistName('New Playlist');
    setPlaylistTracks([]);
    setPlaylistId(null);
    setRemovedTracks([]);
  };

  const searchSpotify = async (term) => {
    setIsLoading(true);
    const searchStartTime = Date.now();

    const searchResults = await Spotify.search(term);
    const searchEndTime = Date.now();
    const remainingTime = 1000 - (searchEndTime - searchStartTime);

    if (remainingTime > 0) {
      setTimeout(() => {
        setSearchResults(searchResults);
        setIsLoading(false);
      }, remainingTime);
    } else {
      setSearchResults(searchResults);
      setIsLoading(false);
    }
  };

  const selectPlaylist = async (id) => {
    const tracks = await Spotify.getPlaylist(id); // Get the latest playlist data
    const playlist = await Spotify.getUserPlaylists().then(playlists => playlists.find(pl => pl.id === id));
    
    setPlaylistId(id);
    setPlaylistName(playlist.name);
    setPlaylistTracks(tracks);
  };
  
  return (
    <div>
      <nav className="navbar">
        <h1>Jammming</h1>
      </nav>
      <div className="content">
        <SearchBar onSearch={searchSpotify} />
        {isLoading && <p>...loading</p>}
        <PlayListList onSelect={selectPlaylist} />
        <div className="app-container">
          {errorMessage && <p className="error-message">{errorMessage}</p>}
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
    </div>
  );
}

export default App;
