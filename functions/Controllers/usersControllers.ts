import { NextFunction } from "express";
import express, { Request, Response } from "express";
import { object } from "firebase-functions/v1/storage";

const {
  newUser,
  fetchUserById,
  newBookLibrary,
  fetchBooksById,
  newBookWishList,
  fetchWishListById,
  fetchBookById,
  fetchWishlistBookById,
  removeBookById,
  removeWishlistBookById,
  addFriendRequest,
  acceptFriendRequest,
  fetchFriendsList,
  fetchReqFriendsList,
  postRequestToBorrow,
  getRequestToBorrow
} = require("../Models/usersModels");

exports.postUser = (req: Request, res: Response, next: NextFunction) => {
  const { body } = req;
  console.log("you made it");
  newUser(body)
    .then((newUser: object) => {
      res.status(201).send(newUser);
    })
    .catch((err: any) => {
      console.log(err);
      next(err);
    });
};

exports.getUserById = (req: Request, res: Response, next: NextFunction) => {
  const { username } = req.params;
  fetchUserById(username)
    .then((user: object) => {
      res.status(200).send(user);
    })
    .catch((err: any) => {
      console.log(err);
      next(err);
    });
};

exports.postBookLibrary = (req: Request, res: Response, next: NextFunction) => {
  const { body } = req;
  const { username } = req.params;
  newBookLibrary(body, username)
    .then((newBook: object) => {
      res.status(201).send(newBook);
    })
    .catch((err: any) => {
      console.log(err);
      next(err);
    });
};

exports.getAllBooksByUsername = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username } = req.params;
  fetchBooksById(username)
    .then((books: object[]) => {
      res.status(200).send(books);
    })
    .catch((err: any) => {
      console.log(err);
      next(err);
    });
};

exports.postBookWishList = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { body } = req;
  const { username } = req.params;
  newBookWishList(body, username)
    .then((newBook: object) => {
      res.status(201).send(newBook);
    })
    .catch((err: any) => {
      console.log(err);
      next(err);
    });
};

exports.getAllWishListByUsername = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username } = req.params;
  fetchWishListById(username)
    .then((books: object[]) => {
      res.status(200).send(books);
    })
    .catch((err: any) => {
      console.log(err);
      next(err);
    });
};

exports.getBookById = (req: Request, res: Response, next: NextFunction) => {
  const { username, bookid } = req.params;
  fetchBookById(username, bookid)
    .then((book: object) => {
      res.status(200).send(book);
    })
    .catch((err: any) => {
      console.log(err);
      next(err);
    });
};

exports.getWishlistBookById = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, bookid } = req.params;
  fetchWishlistBookById(username, bookid)
    .then((book: object) => {
      res.status(200).send(book);
    })
    .catch((err: any) => {
      console.log(err);
      next(err);
    });
};

exports.deleteBookById = (req: Request, res: Response, next: NextFunction) => {
  const { username, bookid } = req.params;
  removeBookById(username, bookid)
    .then(() => {
      res.status(204).send();
    })
    .catch((err: any) => {
      console.log(err);
      next(err);
    });
};

exports.deleteWishlistBookById = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, bookid } = req.params;
  removeWishlistBookById(username, bookid)
    .then(() => {
      res.status(204).send();
    })
    .catch((err: any) => {
      console.log(err);
      next(err);
    });
};

exports.postFriendRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username } = req.params;
  const { body } = req;
  addFriendRequest(username, body)
    .then((friendname: any) => {
      res.status(201).send(friendname);
    })
    .catch((err: any) => {
      next(err);
    });
};

exports.postAceptFriendRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username } = req.params;
  const { body } = req;
  console.log(username, body)
  acceptFriendRequest(username, body)
    .then((friendname: any) => {
      res.status(201).send(friendname);
    })
    .catch((err: any) => {
      next(err);
    });
  }



  exports.getFriendsList = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { username } = req.params;
    console.log(username)
    fetchFriendsList(username)
      .then((friends: object []) => {
        res.status(200).send(friends);
      })
      .catch((err: any) => {
        console.log(err);
        next(err);
      });
  };

  exports.getFriendRequestsList = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { username } = req.params;
    fetchReqFriendsList(username)
      .then((friends: object []) => {
        res.status(200).send(friends);
      })
      .catch((err: any) => {
        console.log(err);
        next(err);
      });
  };

  exports.requestBookToBorrow = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { borrower, owner, bookid } = req.params;
    console.log(borrower, owner, bookid)
    postRequestToBorrow(borrower, owner, bookid)
      .then(() => {
        res.status(201).send();
      })
      .catch((err: any) => {
        console.log(err);
        next(err);
      });
  };


  exports.getRequestsByBook = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { owner, bookid } = req.params;
    console.log( owner, bookid)
    getRequestToBorrow( owner, bookid)
      .then((requestList : any) => {
        res.status(200).send(requestList);
      })
      .catch((err: any) => {
        console.log(err);
        next(err);
      });
  };
