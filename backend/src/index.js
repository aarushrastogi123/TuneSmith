const express = require("express");
const cors = require("cors");

const spotifyRoutes = require("./routes/spotifyRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/spotify", spotifyRoutes);

app.get("/", (req, res) => {
    res.send("ArtistFlow backend running 🚀");
});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000/api/spotify/test");
});
