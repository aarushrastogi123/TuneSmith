const express = require("express");
const router = express.Router();
const axios = require("axios");

const { getAuthURL, getAccessToken } = require("../config/spotifyAuth");
const { addSongs, setSpotifyToken } = require("../services/spotifyService");
let loggedIn = false;

router.get("/login", (req, res) => {
  res.redirect(getAuthURL());
});

router.get("/callback", async (req, res) => {
  try {
    console.log("Spotify callback hit");

    const code = req.query.code;

    console.log("Authorization code:", code);

    const token = await getAccessToken(code);

    console.log("Access token received");

    setSpotifyToken(token);

    // fetch logged-in user
    const profile = await axios.get(
      "https://api.spotify.com/v1/me",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    console.log("Spotify user profile:", profile.data);

    res.send("Spotify login successful 🎧 You can close this tab.");
  } catch (err) {
    console.error("CALLBACK ERROR:");
    console.error(err.response?.data || err.message);

    res.status(500).send("Authentication failed");
  }
});

router.get("/status", (req, res) => {
  res.json({ loggedIn });
});

router.post("/add-songs", async (req, res) => {
  try {
    const { artists, playlistId } = req.body;

    const result = await addSongs(artists, playlistId);

    res.json(result);
  } catch (err) {
    console.error(err.response?.data || err.message);

    res.status(500).json({
      message: "Failed to add songs",
      error: err.response?.data || err.message
    });
  }
});

module.exports = router;