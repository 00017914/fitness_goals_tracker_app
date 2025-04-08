const Goal = require('../../models/Goal');

// Fetch goals for the logged-in user
exports.getGoals = async (req, res) => {
    try {
        // Find goals associated with the logged-in user (using req.userId)
        const goals = await Goal.find({ user: req.userId });
        res.status(200).json(goals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a goal for the logged-in user
exports.createGoal = async (req, res) => {
    try {
        // Create a new goal and associate it with the logged-in user
        const goal = new Goal({
            ...req.body,
            user: req.userId, // Associate goal with the logged-in user
        });

        await goal.save();
        res.status(201).json(goal);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a goal for the logged-in user
exports.updateGoal = async (req, res) => {
    try {
        // Find the goal by ID and ensure it's associated with the logged-in user
        const goal = await Goal.findOneAndUpdate(
            { _id: req.params.id, user: req.userId },
            req.body,
            { new: true }
        );

        if (!goal) return res.status(404).json({ message: 'Goal not found or not authorized' });
        res.status(200).json(goal);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a goal for the logged-in user
exports.deleteGoal = async (req, res) => {
    try {
        // Find and delete the goal, ensuring it's associated with the logged-in user
        const goal = await Goal.findOneAndDelete({ _id: req.params.id, user: req.userId });

        if (!goal) return res.status(404).json({ message: 'Goal not found or not authorized' });
        res.status(200).json({ message: 'Goal deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateGoal = async (req, res) => {
    try {
        const goal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!goal) return res.status(404).json({ message: 'Goal not found' });
        res.status(200).json(goal);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteGoal = async (req, res) => {
    try {
        const goal = await Goal.findByIdAndDelete(req.params.id);
        if (!goal) return res.status(404).json({ message: 'Goal not found' });
        res.status(200).json({ message: 'Goal deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
