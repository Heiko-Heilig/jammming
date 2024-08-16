// src/components/PlayListList.js
import React, { Component } from 'react';
import Spotify from '../Spotify';
import PlayListListItem from './PlayListListItem';
import './PlayListList.css'; // Import the new CSS file

class PlayListList extends Component {
  state = {
    playlists: []
  };

  async componentDidMount() {
    const playlists = await Spotify.getUserPlaylists();
    this.setState({ playlists });
  }

  render() {
    return (
      <div className="playlist-list-container">
        <div className="playlist-list-scroll">
          {this.state.playlists.map(playlist => (
            <PlayListListItem 
              key={playlist.id} 
              id={playlist.id} 
              name={playlist.name} 
              onSelect={this.props.onSelect} 
            />
          ))}
        </div>
      </div>
    );
  }
}

export default PlayListList;
