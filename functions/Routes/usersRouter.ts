const express = require("express");
const { postUser, getUserById , postBookLibrary, getAllBooksByUsername} = require("../Controllers/usersControllers");

const usersRouter = express.Router();
usersRouter.route("/newuser").post(postUser);
usersRouter.route("/:username").get(getUserById);
usersRouter.route("/:username/books").post(postBookLibrary);
usersRouter.route("/:username/books").get(getAllBooksByUsername)
module.exports = usersRouter;
