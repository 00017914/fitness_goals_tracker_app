const mongoose = require("mongoose");

const WorkoutSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, default: Date.now },
  type: { type: String, required: true }, // Running, Weight Lifting, etc.
  duration: { type: Number, required: true }, // in minutes
  caloriesBurned: { type: Number },
});

module.exports = mongoose.model("Workout", WorkoutSchema);
