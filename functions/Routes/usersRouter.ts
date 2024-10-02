const express = require("express");
const {
  postUser,
  getUserById,
  postBookLibrary,
  getAllBooksByUsername,
  postBookWishList,
  getAllWishListByUsername,
  getBookById,
  getWishlistBookById,
  deleteBookById,
  deleteWishlistBookById,
  postFriendRequest,
} = require("../Controllers/usersControllers");

const usersRouter = express.Router();

usersRouter.route("/newuser").post(postUser);

usersRouter.route("/:username").get(getUserById);

usersRouter
  .route("/:username/books")
  .post(postBookLibrary)
  .get(getAllBooksByUsername);

usersRouter
  .route("/:username/wishlist")
  .post(postBookWishList)
  .get(getAllWishListByUsername);

usersRouter
  .route("/:username/books/:bookid")
  .get(getBookById)
  .delete(deleteBookById);

usersRouter
  .route("/:username/wishlist/:bookid")
  .get(getWishlistBookById)
  .delete(deleteWishlistBookById);

usersRouter.route("/:username/friendRequests").post(postFriendRequest);

module.exports = usersRouter;
