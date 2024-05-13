// models/Rating.js
const mongoose = require("mongoose");

const RatingSchema = new mongoose.Schema({
  rater: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  ratee: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, required: true },
  feedback: { type: String },
});

module.exports = mongoose.model("Rating", RatingSchema);
