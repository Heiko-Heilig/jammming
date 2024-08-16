// src/Spotify.js

const clientId = 'a460c7361cf949b79cbacfe559abb545'; // Your Spotify client ID
const redirectUri = 'http://localhost:3000/'; // Your redirect URI
let accessToken;
let userId;

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);

      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
    }
  },

  async getCurrentUserId() {
    if (userId) {
      return Promise.resolve(userId);
    }

    const accessToken = this.getAccessToken();
    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    const jsonResponse = await response.json();
    userId = jsonResponse.id;
    return userId;
  },

  async getUserPlaylists() {
    const userId = await this.getCurrentUserId();
    const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      headers: {
        Authorization: `Bearer ${this.getAccessToken()}`
      }
    });
    const jsonResponse = await response.json();
    return jsonResponse.items.map(playlist => ({
      id: playlist.id,
      name: playlist.name
    }));
  },

  async getPlaylist(id) {
    const userId = await this.getCurrentUserId();
    const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${id}/tracks`, {
      headers: {
        Authorization: `Bearer ${this.getAccessToken()}`
      }
    });
    const jsonResponse = await response.json();
    return jsonResponse.items.map(item => ({
      id: item.track.id,
      name: item.track.name,
      artist: item.track.artists[0].name,
      album: item.track.album.name,
      uri: item.track.uri
    }));
  },

  async createPlaylist(name) {
    const userId = await this.getCurrentUserId();
    const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.getAccessToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        description: 'New playlist from Jammming app',
        public: true
      })
    });
    const jsonResponse = await response.json();
    return jsonResponse.id;
  },

  async addTracksToPlaylist(playlistId, trackUris) {
    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.getAccessToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        uris: trackUris
      })
    });
    return response.json();
  },

  async savePlaylist(name, trackUris, id = null) {
    const userId = await this.getCurrentUserId();

    if (id) {
      // Update existing playlist
      await fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${this.getAccessToken()}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name
        })
      });

      return this.addTracksToPlaylist(id, trackUris);
    } else {
      // Create a new playlist
      const playlistId = await this.createPlaylist(name);
      return this.addTracksToPlaylist(playlistId, trackUris);
    }
  },

  search(term) {
    const accessToken = this.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => response.json())
      .then(jsonResponse => {
        if (!jsonResponse.tracks) {
          return [];
        }
        return jsonResponse.tracks.items.map(track => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri
        }));
      });
  }
};

export default Spotify;
