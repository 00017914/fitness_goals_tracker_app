const UserService = require("../../services/users/index");

exports.getUsers = async (req, res) => {
  const users = await UserService.getAllUsers();
  res.render("users", { users });
};

exports.createUser = async (req, res) => {
  await UserService.createUser(req.body);
  res.redirect("/users");
};

exports.editUser = async (req, res) => {
  const user = await UserService.getUserById(req.params.id);
  res.render("editUser", { user });
};

exports.updateUser = async (req, res) => {
  await UserService.updateUser(req.params.id, req.body);
  res.redirect("/users");
};

exports.deleteUser = async (req, res) => {
  await UserService.deleteUser(req.params.id);
  res.redirect("/users");
};
