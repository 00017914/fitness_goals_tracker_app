require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.set("view engine", "pug");

// Routes
const indexRoutes = require("./routes/index");
const userRoutes = require("./routes/users");
const goalRoutes = require("./routes/goals");
const workoutRoutes = require("./routes/workouts");

app.use("/", indexRoutes);
app.use("/users", userRoutes);
app.use("/goals", goalRoutes);
app.use("/workouts", workoutRoutes);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
