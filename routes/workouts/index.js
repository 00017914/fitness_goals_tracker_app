const express = require('express');
const router = express.Router();
const workoutController = require('../../controllers/workouts/index');

router.get('/', workoutController.getWorkouts);
router.post('/', workoutController.createWorkout);
router.put('/:id', workoutController.updateWorkout);
router.delete('/:id', workoutController.deleteWorkout);

module.exports = router;
