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
  postAceptFriendRequest,
  getFriendsList,
  getFriendRequestsList,
  requestBookToBorrow,
  getRequestsByBook,
  postAcceptedRequest,
  getLending,
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

usersRouter.route("/:username/friendrequests").post(postFriendRequest);
usersRouter.route("/:username/acceptfriend").post(postAceptFriendRequest);
usersRouter.route("/:username/friends").get(getFriendsList);
usersRouter.route("/:username/friendrequests").get(getFriendRequestsList);
usersRouter
  .route("/:borrower/books/:bookid/requestlend/:owner")
  .post(requestBookToBorrow);
usersRouter
  .route("/:owner/books/:bookid/requestlist/:borrower")
  .get(getRequestsByBook);

usersRouter
  .route("/:owner/books/:bookid/acceptrequest/:borrower")
  .post(postAcceptedRequest);

usersRouter.route("/:owner/lending").get(getLending);

module.exports = usersRouter;
