const express = require("express");
const router = express.Router();
const goalsController = require("../../controllers/goals/index");

router.get("/", goalsController.getGoals);
router.post("/", goalsController.createGoal);
router.get("/:id/edit", goalsController.editGoal);
router.put("/:id", goalsController.updateGoal);
router.delete("/:id", goalsController.deleteGoal);

module.exports = router;
