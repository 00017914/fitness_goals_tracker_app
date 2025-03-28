const GoalService = require("../../services/goals/index");

exports.getGoals = async (req, res) => {
  const goals = await GoalService.getAllGoals();
  res.render("goals", { goals });
};

exports.createGoal = async (req, res) => {
  await GoalService.createGoal(req.body);
  res.redirect("/goals");
};

exports.editGoal = async (req, res) => {
  const goal = await GoalService.getGoalById(req.params.id);
  res.render("editGoal", { goal });
};

exports.updateGoal = async (req, res) => {
  await GoalService.updateGoal(req.params.id, req.body);
  res.redirect("/goals");
};

exports.deleteGoal = async (req, res) => {
  await GoalService.deleteGoal(req.params.id);
  res.redirect("/goals");
};
