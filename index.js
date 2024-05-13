const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const ratingRoutes = require("./routes/rating");
const authRoutes = require("./routes/auth");
const app = express();
const port = 3000;

mongoose
  .connect("mongodb://localhost:27017/peer-rating-app", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.use(express.json());

app.use("/users", userRoutes);

app.use("/ratings", ratingRoutes);

app.use("/auth", authRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
