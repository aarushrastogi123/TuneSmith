const axios = require("axios");
const querystring = require("querystring");

const getAuthURL = () => {
  const scopes = [
    "playlist-modify-public",
    "playlist-modify-private",
    "playlist-read-private",
    "user-read-private",
    "user-read-email"
  ];

  return (
    "https://accounts.spotify.com/authorize?" +
    querystring.stringify({
      response_type: "code",
      client_id: process.env.SPOTIFY_CLIENT_ID,
      scope: scopes.join(" "),
      redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
      show_dialog: true
    })
  );
};

const getAccessToken = async (code) => {
  const response = await axios.post(
    "https://accounts.spotify.com/api/token",
    querystring.stringify({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: process.env.SPOTIFY_REDIRECT_URI
    }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(
            process.env.SPOTIFY_CLIENT_ID +
              ":" +
              process.env.SPOTIFY_CLIENT_SECRET
          ).toString("base64")
      }
    }
  );

  return response.data.access_token;
};

module.exports = {
  getAuthURL,
  getAccessToken
};