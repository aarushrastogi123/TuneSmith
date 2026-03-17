const axios = require("axios");

let token = null;

const setSpotifyToken = (t) => {
  token = t;
};

const addSongs = async (artists, playlistId) => {
  if (!token) {
    throw new Error("Spotify not authenticated");
  }

  const headers = {
    Authorization: `Bearer ${token}`
  };

  let uris = [];

  for (const name of artists) {
    const artistSearch = await axios.get(
      "https://api.spotify.com/v1/search",
      {
        headers,
        params: {
          q: name,
          type: "artist",
          limit: 1
        }
      }
    );

    const artist = artistSearch.data.artists.items[0];
    if (!artist) continue;

    const topTracks = await axios.get(
      `https://api.spotify.com/v1/artists/${artist.id}/top-tracks`,
      {
        headers,
        params: { market: "US" }
      }
    );

    topTracks.data.tracks.forEach((t) => uris.push(t.uri));
  }

  await axios.post(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    {
      uris: uris
    },
    {
      headers
    }
  );

  return {
    addedTracks: uris.length
  };
};

module.exports = {
  addSongs,
  setSpotifyToken
};