const express = require("express");
const router = express.Router();
const Games = require("./gamesModel");

router.get("/", (req, res) => {
  const gameList = Games.get();
  res.status(200).json(gameList);
});

module.exports = router;
