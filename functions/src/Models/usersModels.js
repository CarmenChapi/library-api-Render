"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = require("../../connection");
const fs = require("fs/promises");
exports.newUser = (userData) => {
    return connection_1.db
        .collection("users")
        .doc(userData.username)
        .create({ name: userData.name, friends: [], friendRequests: [] })
        .then(() => {
        return connection_1.db
            .collection("users")
            .doc(userData.username)
            .get()
            .then((user) => {
            return user.data();
        });
    });
};
exports.fetchUserById = (id) => {
    return connection_1.db
        .collection("users")
        .doc(id)
        .get()
        .then((user) => {
        return user.data();
    });
};
exports.newBookLibrary = (book, username) => {
    // const newBook = {...book, }
    // }
    return connection_1.db
        .collection("users")
        .doc(username)
        .collection("books")
        .doc(book.bookInfo.industryIdentifiers[0].identifier)
        .set(book)
        .then(() => {
        return connection_1.db
            .collection("users")
            .doc(username)
            .collection("books")
            .doc(book.bookInfo.industryIdentifiers[0].identifier)
            .get()
            .then((book) => {
            return book.data();
        });
    });
};
exports.fetchBooksById = (username, lendable) => {
    if (lendable === "true") {
        return connection_1.db
            .collection("users")
            .doc(username)
            .collection("books")
            .where("lendable", "==", true)
            .get()
            .then((books) => {
            const bookArray = [];
            books.forEach((book) => {
                bookArray.push(book.data());
            });
            return bookArray;
        });
    }
    else {
        return connection_1.db
            .collection("users")
            .doc(username)
            .collection("books")
            .get()
            .then((books) => {
            const bookArray = [];
            books.forEach((book) => {
                bookArray.push(book.data());
            });
            return bookArray;
        });
    }
};
exports.removeBookById = (username, bookid) => {
    return connection_1.db
        .collection("users")
        .doc(username)
        .collection("books")
        .doc(bookid)
        .delete();
};
exports.newBookWishList = (book, username) => {
    return connection_1.db
        .collection("users")
        .doc(username)
        .collection("wishlist")
        .doc(book.industryIdentifiers[0].identifier)
        .set(book)
        .then(() => {
        return connection_1.db
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
exports.removeWishlistBookById = (username, bookid) => {
    return connection_1.db
        .collection("users")
        .doc(username)
        .collection("wishlist")
        .doc(bookid)
        .delete();
};
exports.fetchWishListById = (username) => {
    return connection_1.db
        .collection("users")
        .doc(username)
        .collection("wishlist")
        .get()
        .then((books) => {
        const bookArray = [];
        books.forEach((book) => {
            bookArray.push(book.data());
        });
        return bookArray;
    });
};
exports.fetchBookById = (username, bookId) => {
    return connection_1.db
        .collection("users")
        .doc(username)
        .collection("books")
        .doc(bookId)
        .get()
        .then((book) => {
        return book.data();
    });
};
exports.fetchWishlistBookById = (username, bookId) => {
    return connection_1.db
        .collection("users")
        .doc(username)
        .collection("wishlist")
        .doc(bookId)
        .get()
        .then((book) => {
        return book.data();
    });
};
exports.addFriendRequest = (username, friendRequest) => {
    return connection_1.db
        .collection("users")
        .doc(friendRequest.username)
        .get()
        .then((user) => {
        const userData = user.data();
        if (userData) {
            return connection_1.db
                .collection("users")
                .doc(username)
                .collection("friendRequests")
                .doc(friendRequest.username)
                .set(friendRequest)
                .then(() => {
                return connection_1.db
                    .collection("users")
                    .doc(username)
                    .collection("friendRequests")
                    .doc(friendRequest.username)
                    .get();
            })
                .then((user) => {
                return user.data();
            });
        }
        else {
            return Promise.reject({ status: 404, msg: "not found" });
        }
    });
};
exports.acceptFriendRequest = (username, friendToAccept) => {
    return connection_1.db
        .collection("users")
        .doc(username)
        .collection("friendRequests")
        .doc(friendToAccept.username)
        .get()
        .then((user) => {
        const userData = user.data();
        if (userData) {
            return connection_1.db
                .collection("users")
                .doc(username)
                .collection("friends")
                .doc(friendToAccept.username)
                .set(friendToAccept)
                .then(() => {
                return connection_1.db
                    .collection("users")
                    .doc(username)
                    .collection("friendRequests")
                    .doc(friendToAccept.username)
                    .delete();
            })
                .then(() => {
                return connection_1.db
                    .collection("users")
                    .doc(friendToAccept.username)
                    .collection("friends")
                    .doc(username)
                    .set({ username: username });
            })
                .then(() => {
                return connection_1.db
                    .collection("users")
                    .doc(username)
                    .collection("friends")
                    .doc(friendToAccept.username)
                    .get();
            })
                .then((user) => {
                return user.data();
            });
        }
        else {
            return Promise.reject({ status: 404, msg: "not found" });
        }
    });
};
exports.fetchFriendsList = (username) => {
    return connection_1.db
        .collection("users")
        .doc(username)
        .collection("friends")
        .get()
        .then((friends) => {
        const friendsArray = [];
        friends.forEach((friend) => {
            friendsArray.push(friend.data());
        });
        return friendsArray;
    });
};
exports.fetchReqFriendsList = (username) => {
    return connection_1.db
        .collection("users")
        .doc(username)
        .collection("friendRequests")
        .get()
        .then((friends) => {
        const friendsArray = [];
        friends.forEach((friend) => {
            friendsArray.push(friend.data());
        });
        return friendsArray;
    });
};
exports.postRequestToBorrow = (borrower, owner, bookId) => {
    return connection_1.db
        .collection("users")
        .doc(owner)
        .collection("books")
        .doc(bookId)
        .get()
        .then((book) => {
        return connection_1.db
            .collection("users")
            .doc(owner)
            .collection("borrowRequest")
            .doc(bookId)
            .set({ bookInfo: book.data().bookInfo, [borrower]: Date.now() }, { merge: true });
    });
};
exports.getRequestToBorrow = (owner, bookId) => {
    return connection_1.db
        .collection("users")
        .doc(owner)
        .collection("borrowRequest")
        .doc(bookId)
        .get()
        .then((requestInfo) => {
        return requestInfo.data();
    });
};
exports.acceptRequest = (owner, bookId, borrower) => {
    return connection_1.db
        .collection("users")
        .doc(owner)
        .collection("books")
        .doc(bookId)
        .get()
        .then((book) => {
        return connection_1.db
            .collection("users")
            .doc(owner)
            .collection("lending")
            .doc(bookId)
            .set({ bookInfo: book.data().bookInfo, borrower: borrower });
    })
        .then(() => {
        return connection_1.db
            .collection("users")
            .doc(owner)
            .collection("books")
            .doc(bookId)
            .update({ isLentTo: borrower, lendable: false });
    })
        .then(() => {
        return connection_1.db
            .collection("users")
            .doc(owner)
            .collection("books")
            .doc(bookId)
            .get();
    })
        .then((book) => {
        return connection_1.db
            .collection("users")
            .doc(borrower)
            .collection("borrowed")
            .doc(bookId)
            .set({ isLentFrom: owner, bookInfo: book.data().bookInfo });
    })
        .then(() => {
        return connection_1.db
            .collection("users")
            .doc(owner)
            .collection("borrowRequest")
            .doc(bookId)
            .delete();
    });
};
exports.removeFriendRequest = (username, rejectfriend) => {
    return connection_1.db
        .collection("users")
        .doc(username)
        .collection("friendRequests")
        .doc(rejectfriend)
        .delete();
};
exports.removeBorrowRequest = (username, bookid) => {
    console.log("you here", username, bookid);
    return connection_1.db
        .collection("users")
        .doc(username)
        .collection("borrowRequest")
        .doc(bookid)
        .delete();
};
exports.fetchLending = (owner) => {
    return connection_1.db
        .collection("users")
        .doc(owner)
        .collection("lending")
        .get()
        .then((books) => {
        const booksArray = [];
        books.forEach((book) => {
            booksArray.push({ [book.id]: book.data() });
            console.log(book.id);
        });
        return booksArray;
    });
};
exports.fetchBorrowing = (borrower) => {
    console.log(borrower, "you here");
    return connection_1.db
        .collection("users")
        .doc(borrower)
        .collection("borrowed")
        .get()
        .then((books) => {
        const booksArray = [];
        books.forEach((book) => {
            booksArray.push({ [book.id]: book.data() });
            console.log(book.id);
        });
        return booksArray;
    });
};
exports.returnBorrowedBookById = (borrower, owner, bookid) => {
    //remove book from borrowers borrowed
    return (connection_1.db
        .collection("users")
        .doc(borrower)
        .collection("borrowed")
        .doc(bookid)
        .delete()
        //remove book from owners lending
        .then(() => {
        return connection_1.db
            .collection("users")
            .doc(owner)
            .collection("lending")
            .doc(bookid)
            .delete();
    })
        //set owners book isLendable to true
        .then(() => {
        return connection_1.db
            .collection("users")
            .doc(owner)
            .collection("books")
            .doc(bookid)
            .set({ lendable: true }, { merge: true });
    }));
};
exports.fetchEndpoints = () => {
    return fs.readFile(`${__dirname}/../endpoints.json`, "utf-8")
        .then((data) => {
        return JSON.parse(data);
    });
};
