const express = require("express");
const { postUser, getUserById , postBookLibrary} = require("../Controllers/usersControllers");

const usersRouter = express.Router();
usersRouter.route("/newuser").post(postUser);
usersRouter.route("/:username").get(getUserById);
usersRouter.route("/:username/books").post(postBookLibrary);
module.exports = usersRouter;
