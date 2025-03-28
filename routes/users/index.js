const express = require("express");
const router = express.Router();
const usersController = require("../../controllers/users/index");

router.get("/", usersController.getUsers);
router.post("/", usersController.createUser);
router.get("/:id/edit", usersController.editUser);
router.put("/:id", usersController.updateUser);
router.delete("/:id", usersController.deleteUser);

module.exports = router;
