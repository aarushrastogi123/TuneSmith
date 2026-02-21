const express = require("express");
const router = express.Router();

const { testService } = require("../services/spotifyService");

router.get("/test", (req, res) => {
    const message = testService();
    res.json({ message });
});

module.exports = router;
