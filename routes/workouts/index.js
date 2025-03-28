const express = require("express");
const router = express.Router();
const workoutsController = require("../../controllers/workouts/index");

router.get("/", workoutsController.getWorkouts);
router.post("/", workoutsController.createWorkout);
router.get("/:id/edit", workoutsController.editWorkout);
router.put("/:id", workoutsController.updateWorkout);
router.delete("/:id", workoutsController.deleteWorkout);

module.exports = router;
