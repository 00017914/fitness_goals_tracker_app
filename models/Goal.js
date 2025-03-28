const mongoose = require("mongoose");

const GoalSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, required: true }, // "Weight Loss", "Muscle Gain", etc.
  target: { type: Number, required: true },
  progress: { type: Number, default: 0 },
});

module.exports = mongoose.model("Goal", GoalSchema);
