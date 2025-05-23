// --- routes/goals/index.js ---
const express = require('express');
const router = express.Router();
const goalController = require('../../controllers/goals/index');

router.get('/', goalController.getGoals);
router.post('/', goalController.createGoal);
router.put('/:id', goalController.updateGoal);
router.delete('/:id', goalController.deleteGoal);

module.exports = router;
