import { db } from "../connection";

exports.newUser = (userData: any) => {
  return db
    .collection("users")
    .doc(userData.username)
    .create({ name: userData.name, friends: [], friendRequests: [] })
    .then(() => {
      return db
        .collection("users")
        .doc(userData.username)
        .get()
        .then((user) => {
          return user.data();
        });
    });
};

exports.fetchUserById = (id: string) => {
  return db
    .collection("users")
    .doc(id)
    .get()
    .then((user) => {
      console.log(user);
      console.log(user.data());
      return user.data();
    });
};

exports.newBookLibrary = (book: any, username: string) => {
  return db
    .collection("users")
    .doc(username)
    .collection("books")
    .doc(book.industryIdentifiers[0].identifier)
    .set(book)
    .then(() => {
      return db
        .collection("users")
        .doc(username)
        .collection("books")
        .doc(book.industryIdentifiers[0].identifier)
        .get()
        .then((book) => {
          return book.data();
        });
    });
};

exports.fetchBooksById = (username: string) => {
  return db
    .collection("users")
    .doc(username)
    .collection("books")
    .get()
    .then((books: any) => {
      const bookArray: any[] = [];
      books.forEach((book: any) => {
        bookArray.push(book.data());
      });
      return bookArray;
    });
};

exports.removeBookById = (username: string, bookid: string) => {
  console.log(username, bookid);
  return db
    .collection("users")
    .doc(username)
    .collection("books")
    .doc(bookid)
    .delete();
};

exports.newBookWishList = (book: any, username: string) => {
  return db
    .collection("users")
    .doc(username)
    .collection("wishlist")
    .doc(book.industryIdentifiers[0].identifier)
    .set(book)
    .then(() => {
      return db
        .collection("users")
        .doc(username)
        .collection("wishlist")
        .doc(book.industryIdentifiers[0].identifier)
        .get()
        .then((book) => {
          return book.data();
        });
    });
};

exports.removeWishlistBookById = (username: string, bookid: string) => {
  console.log(username, bookid);
  return db
    .collection("users")
    .doc(username)
    .collection("wishlist")
    .doc(bookid)
    .delete();
};

exports.fetchWishListById = (username: string) => {
  return db
    .collection("users")
    .doc(username)
    .collection("wishlist")
    .get()
    .then((books: any) => {
      const bookArray: any[] = [];
      books.forEach((book: any) => {
        bookArray.push(book.data());
      });
      return bookArray;
    });
};

exports.fetchBookById = (username: string, bookId: any) => {
  return db
    .collection("users")
    .doc(username)
    .collection("books")
    .doc(bookId)
    .get()
    .then((book: any) => {
      return book.data();
    });
};

exports.fetchWishlistBookById = (username: string, bookId: any) => {
  return db
    .collection("users")
    .doc(username)
    .collection("wishlist")
    .doc(bookId)
    .get()
    .then((book: any) => {
      return book.data();
    });
};

exports.addFriendRequest = (username: string, friendRequest: any) => {
  return db
    .collection("users")
    .doc(friendRequest.username)
    .get()
    .then((user) => {
      const userData = user.data();
      if (userData) {
        return db
          .collection("users")
          .doc(username)
          .collection("friendRequests")
          .doc(friendRequest.username)
          .set(friendRequest)
          .then(() => {
            return db
              .collection("users")
              .doc(username)
              .collection("friendRequests")
              .doc(friendRequest.username)
              .get();
          })
          .then((user: any) => {
            return user.data();
          });
      } else {
        return Promise.reject({ status: 404, msg: "not found" });
      }
    });
};
