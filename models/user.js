// models/User.js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  averageRating: { type: Number, default: 0 },
  ratings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Rating" }],
});

module.exports = mongoose.model("User", UserSchema);
