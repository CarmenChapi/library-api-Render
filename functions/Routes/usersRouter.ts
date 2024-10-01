const express = require("express");
const { postUser, getUserById } = require("../Controllers/usersControllers");

const usersRouter = express.Router();
usersRouter.route("/newuser").post(postUser);
usersRouter.route("/:username").get(getUserById);
module.exports = usersRouter;
