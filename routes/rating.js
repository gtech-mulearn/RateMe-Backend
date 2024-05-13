// routes/rating.js
const express = require("express");
const jwt = require("jsonwebtoken");
const Rating = require("../models/rating");
const User = require("../models/user");
const router = express.Router();

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  const decoded = jwt.verify(token, "secretkey");
  req.userId = decoded.id;
  next();
};

router.post("/rate", authMiddleware, async (req, res) => {
  const { rateeId, rating, feedback } = req.body;
  if (rating < 3 && !feedback) {
    return res.status(400).send("Feedback is required for ratings below 3");
  }

  const newRating = new Rating({
    rater: req.userId,
    ratee: rateeId,
    rating,
    feedback,
  });
  await newRating.save();

  const ratee = await User.findById(rateeId);
  ratee.ratings.push(newRating._id);
  ratee.averageRating =
    ratee.ratings.reduce((sum, rating) => sum + rating.rating, 0) /
    ratee.ratings.length;
  await ratee.save();

  res.send("Rating submitted");
});

router.get("/feedback/:userId", authMiddleware, async (req, res) => {
  const ratings = await Rating.find({ ratee: req.params.userId }).populate(
    "rater",
    "username"
  );
  res.json(ratings);
});

module.exports = router;

// server.js
