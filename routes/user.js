// routes/user.js
const express = require("express");
const User = require("../models/user");
const router = express.Router();

router.get("/list", async (req, res) => {
  const users = await User.find().select("username averageRating");
  res.json(users);
});

router.get("/profile/:userId", async (req, res) => {
  const user = await User.findById(req.params.userId).select(
    "username averageRating"
  );
  res.json(user);
});

module.exports = router;

// server.js
