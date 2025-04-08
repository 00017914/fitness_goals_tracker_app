const Workout = require('../../models/Workout');

// Fetch workouts for the logged-in user
exports.getWorkouts = async (req, res) => {
    try {
        // Find workouts associated with the logged-in user (using req.userId)
        const workouts = await Workout.find({ user: req.userId });
        res.status(200).json(workouts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a workout for the logged-in user
exports.createWorkout = async (req, res) => {
    try {
        // Create a new workout and associate it with the logged-in user
        const workout = new Workout({
            ...req.body,
            user: req.userId, // Associate workout with the logged-in user
        });

        await workout.save();
        res.status(201).json(workout);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a workout for the logged-in user
exports.updateWorkout = async (req, res) => {
    try {
        // Find the workout by ID and ensure it's associated with the logged-in user
        const workout = await Workout.findOneAndUpdate(
            { _id: req.params.id, user: req.userId },
            req.body,
            { new: true }
        );

        if (!workout) return res.status(404).json({ message: 'Workout not found or not authorized' });
        res.status(200).json(workout);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a workout for the logged-in user
exports.deleteWorkout = async (req, res) => {
    try {
        // Find and delete the workout, ensuring it's associated with the logged-in user
        const workout = await Workout.findOneAndDelete({ _id: req.params.id, user: req.userId });

        if (!workout) return res.status(404).json({ message: 'Workout not found or not authorized' });
        res.status(200).json({ message: 'Workout deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
